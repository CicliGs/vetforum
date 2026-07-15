$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

$keepHeader = @(
  'cow-hero.png', 'logo-brand.svg', 'logo-triangle.png',
  'icon-telegram.svg', 'icon-instagram.svg', 'icon-call.svg', 'icon-call-outgoing.svg',
  'program-card-decor.svg', 'main-bg-bubbles--mobile.svg', 'to-top.svg', 'to-top.png', 'play-orange.svg'
)

$keepAgriculture = @(
  'program-1.png', 'program-2.png', 'program-3.png', 'photo.jpg',
  'about-1.png', 'about-2.png', 'about-3.png', 'magazine.png'
)

$keepOrgs = @('org-1.png', 'org-2.png', 'org-3.png')
$keepJs = @(
  'jquery-1.12.0.js', 'bootstrap.js', 'jquery.maskedinput.min.js',
  'main.js', 'regmodal.js', 'demo.js'
)
$keepCssFiles = @(
  'bootstrap.min.css', 'main.css', 'tokens.css', 'base.css', 'responsive.css'
)
$keepCssDirs = @('components', 'sections')

function Remove-Except($dir, [string[]]$keep) {
  if (-not (Test-Path $dir)) { return }
  Get-ChildItem $dir -File | Where-Object { $keep -notcontains $_.Name } | Remove-Item -Force
}

$img = Join-Path $root 'img'
foreach ($name in @('about','bag','contacts','farmer','form','partners','photo-reports','program','reviews','slides','svg','video','video_end','why')) {
  $path = Join-Path $img $name
  if (Test-Path $path) { Remove-Item $path -Recurse -Force }
}

Get-ChildItem $img -File -ErrorAction SilentlyContinue | Remove-Item -Force
Remove-Except (Join-Path $img 'header') $keepHeader
Remove-Except (Join-Path $img 'agriculture') $keepAgriculture
Remove-Except (Join-Path $img 'orgs') $keepOrgs

# CSS: keep modular files and component/section directories intact
$css = Join-Path $root 'css'
if (Test-Path $css) {
  Get-ChildItem $css -Directory | Where-Object { $keepCssDirs -notcontains $_.Name } | Remove-Item -Recurse -Force
  Remove-Except $css $keepCssFiles
}

# JS: keep site scripts; drop vendor extras if any
$js = Join-Path $root 'js'
if (Test-Path (Join-Path $js 'vendor')) { Remove-Item (Join-Path $js 'vendor') -Recurse -Force }
Remove-Except $js $keepJs

$files = Get-ChildItem $root -Recurse -File | Where-Object { $_.FullName -notmatch '\\.git\\' }
$mb = [math]::Round((($files | Measure-Object Length -Sum).Sum / 1MB), 2)
Write-Host "Done. Files: $($files.Count), Size: $mb MB"
