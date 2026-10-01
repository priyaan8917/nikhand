@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Node.js is missing. Install Node.js 22 LTS, then run this file again.
 pause
 exit /b 1
)
node -e "const v=process.versions.node.split('.').map(Number);process.exit((v[0]===22 || (v[0]===20 && v[1]>=11) || (v[0]===18 && v[1]>=19))?0:1)"
if errorlevel 1 (
 echo Use Node.js 22 for this Angular 18 project.
 node --version
 pause
 exit /b 1
)
if not exist node_modules\.bin\ng.cmd (
 echo Installing project dependencies. Please wait...
 call npm.cmd install
 if errorlevel 1 (
  echo Installation failed. Copy the error above and share it.
  pause
  exit /b 1
 )
)
echo Starting Nikhand. Keep this window open.
call npm.cmd start -- --open
pause
