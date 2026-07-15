# Assembles index.html from index.src.html + partials/*.html
# Usage: .\build.ps1
# Partials are the source of truth; run this before deploying to GitHub Pages.

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$templatePath = Join-Path $root "index.src.html"
$partialsDir = Join-Path $root "partials"
$outPath = Join-Path $root "index.html"

if (-not (Test-Path $templatePath)) {
    throw "Template not found: $templatePath"
}
if (-not (Test-Path $partialsDir)) {
    throw "Partials directory not found: $partialsDir"
}

$html = Get-Content -Path $templatePath -Raw -Encoding UTF8

$markers = [regex]::Matches($html, '<!--\s*PARTIAL:([a-zA-Z0-9_-]+)\s*-->')
if ($markers.Count -eq 0) {
    Write-Warning "No PARTIAL markers found in index.src.html"
}

foreach ($m in $markers) {
    $name = $m.Groups[1].Value
    $partialPath = Join-Path $partialsDir "$name.html"
    if (-not (Test-Path $partialPath)) {
        throw "Missing partial: $partialPath (referenced as <!-- PARTIAL:$name -->)"
    }
    $content = Get-Content -Path $partialPath -Raw -Encoding UTF8
    # Normalize line endings; trim trailing whitespace/newlines for clean insert
    $content = $content -replace "`r`n", "`n"
    $content = $content.TrimEnd() + "`n"
    $html = $html.Replace($m.Value, $content.TrimEnd("`n") )
}

# Prefer LF in output for consistency with static hosting
$html = $html -replace "`r`n", "`n"

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($outPath, $html, $utf8NoBom)

Write-Host "Built $outPath from index.src.html + $($markers.Count) partial(s)."
