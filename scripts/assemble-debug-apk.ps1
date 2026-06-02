# Build Grove debug APK (Windows). Requires Android Studio SDK + JDK (bundled JBR).
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent

$jbr = "${env:ProgramFiles}\Android\Android Studio\jbr"
if (-not (Test-Path $jbr)) {
    Write-Error "Android Studio JBR not found at $jbr. Install Android Studio or set JAVA_HOME."
}
$env:JAVA_HOME = $jbr
$sdk = "$env:LOCALAPPDATA\Android\Sdk"
if (Test-Path $sdk) { $env:ANDROID_HOME = $sdk }

Push-Location $root
try {
    npm run cap:sync
    npm run cap:icons
    Push-Location android
    try {
        .\gradlew.bat assembleDebug
        $apk = Resolve-Path "app\build\outputs\apk\debug\app-debug.apk"
        Write-Host ""
        Write-Host "APK: $apk"
    } finally {
        Pop-Location
    }
} finally {
    Pop-Location
}
