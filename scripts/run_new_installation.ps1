$workDir = Get-Location

Set-Location $PSScriptRoot

..\clear_node_modules.ps1
.\install_npm_global_packages.ps1
.\install_node_modules.ps1

Set-Location $workDir
