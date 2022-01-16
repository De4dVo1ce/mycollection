function Yarn-Upgrade-Recursive () {
    param ($dir)

    if (Test-Path "$dir/package.json" -PathType Leaf) {
        set-location $dir
        Write-Host -f Green "$dir ..."
        $null = yarn upgrade --latest
    }

    $subDirs = Get-ChildItem -Path $dir -Directory -Force -ErrorAction SilentlyContinue
    foreach ($subDir in $subDirs) {
        if ($subDir.Name -ne "node_modules"){
            Yarn-Upgrade-Recursive -dir $subDir
        }
    }
}

Write-Host -f Green `
  "`n==================================" `
  "`n=== Upgrading dependencies...  ===" `
  "`n==================================`n"

$workDir = Get-Location

$repoRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "../"))
Set-Location $repoRoot

Yarn-Upgrade-Recursive -dir $repoRoot

Set-Location $workDir