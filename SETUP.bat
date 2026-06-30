@echo off
echo.
echo ========================================
echo  platform-setup - First Time Setup
echo ========================================
echo.
echo This will:
echo   1. Set PowerShell execution policy
echo   2. Unblock all scripts in this folder and subdirectories
echo.
echo Run this as Administrator.
echo.

:: Check for admin
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Please right-click SETUP.bat and choose "Run as administrator"
    echo.
    pause
    exit /b 1
)

:: Set execution policy
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine -Force"
echo [OK] Execution policy set to RemoteSigned

:: Unblock all ps1 files in this folder and subdirectories
powershell -Command "Get-ChildItem -Path '%~dp0' -Filter *.ps1 -Recurse | Unblock-File"
echo [OK] All scripts unblocked

echo.
echo ========================================
echo  Done. You can now run the scripts.
echo  Start with any file: .\filename.ps1
echo ========================================
echo.
pause
