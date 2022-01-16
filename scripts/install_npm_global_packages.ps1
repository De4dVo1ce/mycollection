function Install-Global-Package {
    param($packageName)

    try {
        iex "Write-Host -f Green `"`nInstalling latest $($packageName)...`""
        iex "$('$null') = npm install --global $($packageName) --latest"
        iex "$('$versionOutput') = $($packageName) --version"
        $versionTextArray = $versionOutput.Split("`n")
        $version = $versionTextArray[$versionTextArray.Length - 1]
        iex "Write-Host -f Green `"$($packageName) @ $($version) installed successfully`""
    } catch {
        iex "Write-Host -f Red `"`n$($packageName) could not be installed`""
    }
}

$workDir = Get-Location

$repoRoot = Join-Path $PSScriptRoot "../"
Set-Location $repoRoot

$packages = @('npm', 'yarn', 'pm2', 'serve')

try {
    $npmVersion = npm --version
    
    Write-Host -f Green `
    ("`n==========================================" + ("=" * $npmVersion.Length)) `
    ("`n=== Installing npm@$npmVersion global packages... ===") `
    ("`n==========================================" + ("=" * $npmVersion.Length))

    foreach ($package in $packages) {
        Install-Global-Package -packageName $package
    }
} catch {
    Write-Host -f Red "`nnpm not installed"
}

Set-Location $workDir