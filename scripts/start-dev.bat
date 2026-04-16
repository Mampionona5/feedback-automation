@echo off
REM Script de démarrage du serveur de développement
REM Fichier: start-dev.bat

cls
color 0A
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   Feedback Automation App - Serveur de Développement   ║
echo ║                   Next.js 14.0.0                       ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Vérifier si npm est installé
npm --version >nul 2>&1
if errorlevel 1 (
    color 0C
    echo [ERREUR] npm n'est pas installé ou non trouvé
    echo.
    echo Télécharge Node.js depuis: https://nodejs.org/
    pause
    exit /b 1
)

echo [INFO] Vérification des dépendances...
if not exist "node_modules" (
    echo [WARN] node_modules non trouvé
    echo [INFO] Installation des dépendances...
    call npm install
    if errorlevel 1 (
        color 0C
        echo [ERREUR] Erreur lors de l'installation
        pause
        exit /b 1
    )
)

echo [OK] Dépendances vérifiées
echo.
echo [INFO] Démarrage du serveur de développement...
echo [INFO] Accès: http://localhost:3000
echo [INFO] Appuie sur Ctrl+C pour arrêter le serveur
echo.
echo ═══════════════════════════════════════════════════════════
echo.

REM Lancer le serveur
npm run dev

if errorlevel 1 (
    color 0C
    echo.
    echo [ERREUR] Le serveur s'est arrêté avec une erreur
    pause
    exit /b 1
)
