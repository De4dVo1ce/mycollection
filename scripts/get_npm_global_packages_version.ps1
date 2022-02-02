param([string[]]$packages = @('npm', 'yarn', 'pm2', 'serve'))

function Get-GlobalPackageVersion {
  param($packageName)

  try {
    iex "$('$versionOutput') = $($packageName) --version"
    $versionTextArray = $versionOutput.Split("`n")
    $version = $versionTextArray[$versionTextArray.Length - 1]
    Write-Host -f Green "$($packageName) @ $($version)"
  } catch {
    Write-Host -f Red "`n$($packageName) is not installed"
  }
}

Write-Host $array

$workDir = Get-Location

$repoRoot = Join-Path $PSScriptRoot "../"
Set-Location $repoRoot

try {
  $npmVersion = npm --version

  Write-Host -f Green `
  ("`n================================") `
  ("`n=== Global packages versions ===") `
  ("`n================================")

  foreach ($package in $packages) {
      Get-GlobalPackageVersion -packageName $package
  }
} catch {
    Write-Host -f Red "`nnpm not installed"
}

Set-Location $workDir