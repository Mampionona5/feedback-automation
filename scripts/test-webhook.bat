@echo off
REM Script pour tester le webhook avec curl
REM Fichier: test-webhook.bat

cls
color 0B
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║     Test du Webhook - Feedback Automation App          ║
echo ╚════════════════════════════════════════════════════════╝
echo.

set WEBHOOK_URL=http://localhost:3000/api/webhook

echo [INFO] URL du webhook: %WEBHOOK_URL%
echo.

REM Créer un fichier JSON temporaire avec les données de test
(
echo {
echo   "eventId": "test_%DATE:~-4%%DATE:~-10,2%%DATE:~-7,2%_%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%",
echo   "eventType": "FORM_RESPONSE",
echo   "data": {
echo     "responseId": "response_test_001",
echo     "formId": "form_test_001",
echo     "fields": [
echo       {"key": "field_1", "label": "Votre prénom", "type": "SHORT_TEXT", "value": "Jean"},
echo       {"key": "field_2", "label": "Votre email", "type": "EMAIL", "value": "jean.test@example.com"},
echo       {"key": "field_3", "label": "Comment évaluez-vous le contenu en général ?", "type": "RATING", "value": 9},
echo       {"key": "field_4", "label": "Quelle est votre niveau de satisfaction général ?", "type": "RATING", "value": 8},
echo       {"key": "field_5", "label": "Qu'avez-vous le plus apprécié ?", "type": "LONG_TEXT", "value": "Excellente organisation et contenu pertinent !"},
echo       {"key": "field_6", "label": "À quel atelier avez-vous participé ?", "type": "SHORT_TEXT", "value": "Atelier de leadership"}
echo     ]
echo   }
echo }
) > test-data.json

echo [INFO] Envoi des données de test...
echo.

REM Vérifier si curl existe
where curl >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Utilisation de curl...
    curl -X POST %WEBHOOK_URL% ^
      -H "Content-Type: application/json" ^
      -d @test-data.json
) else (
    echo [WARN] curl non trouvé, utilisation de PowerShell...
    powershell -Command "Invoke-WebRequest -Uri '%WEBHOOK_URL%' -Method POST -Body (Get-Content test-data.json -Raw) -ContentType 'application/json' | Select-Object StatusCode, Content"
)

echo.
echo.
echo [INFO] Test terminé
echo [INFO] Vérifications à faire:
echo   1. Vérifie Notion pour un nouveau client et feedback
echo   2. Vérifie ton email pour le message de remerciement
echo.

del test-data.json >nul 2>&1

pause
