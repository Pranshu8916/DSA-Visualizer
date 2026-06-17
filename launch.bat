@echo off
title DSA Visualizer Launcher
echo ===================================================
echo   Starting DSALab (Express Backend + Vite Frontend)  
echo ===================================================
echo.

cd /d "D:\dsa-visualizer"

:: Check if node_modules exist at root, install if not
if not exist "node_modules" (
    echo Installing root dependencies...
    call npm install
)

:: Start the dev workspace
echo Launching development server...
start "" cmd /c "npm run dev"

echo Waiting for servers to boot up...
timeout /t 4 /nobreak > nul

echo Opening visualizer in your default browser...
start http://localhost:5173/

echo.
echo Launch sequence complete. Close this window if desired.
exit
