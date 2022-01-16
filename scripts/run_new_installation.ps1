param ([switch]$clear, [switch]$install, [switch]$adds, [switch]$modules, [switch]$upgrade)

$repoRoot = $PSScriptRoot
Set-Location $repoRoot

if ($clear) {
  .\clear_node_modules.ps1
}

if ($adds -or $install) {  
  .\scripts\install_npm_global_packages.ps1
}

if ($modules -or $install -or $upgrade) {
  .\scripts\install_node_modules.ps1
}

if ($upgrade) {
  .\scripts\upgrade_packages.ps1
}

