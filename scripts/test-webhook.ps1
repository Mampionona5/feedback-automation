# Script de test pour le webhook Feedback Automation
# Usage: .\test-webhook.ps1

Write-Host "🧪 Test du Webhook Feedback Automation" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

# Configuration
$webhookUrl = "http://localhost:3000/api/webhook"

# Données de test simulant une soumission Tally
$testData = @{
    eventId = "test_$(Get-Date -Format 'yyyyMMddHHmmss')"
    eventType = "FORM_RESPONSE"
    data = @{
        responseId = "response_test_001"
        formId = "form_test_001"
        fields = @(
            @{
                key = "field_1"
                label = "Votre prénom"
                type = "SHORT_TEXT"
                value = "Jean"
            },
            @{
                key = "field_2"
                label = "Votre email"
                type = "EMAIL"
                value = "jean.test@example.com"
            },
            @{
                key = "field_3"
                label = "Comment évaluez-vous le contenu en général ?"
                type = "RATING"
                value = 9
            },
            @{
                key = "field_4"
                label = "Quelle est votre niveau de satisfaction général ?"
                type = "RATING"
                value = 8
            },
            @{
                key = "field_5"
                label = "Qu'avez-vous le plus apprécié ?"
                type = "LONG_TEXT"
                value = "Excellente organisation et contenu très pertinent !"
            },
            @{
                key = "field_6"
                label = "À quel atelier avez-vous participé ?"
                type = "SHORT_TEXT"
                value = "Atelier de leadership"
            }
        )
    }
} | ConvertTo-Json -Depth 10

Write-Host "`n📨 Envoi des données de test..." -ForegroundColor Cyan
Write-Host "URL: $webhookUrl" -ForegroundColor Gray
Write-Host "`n📦 Données envoyées:" -ForegroundColor Cyan
Write-Host $testData -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri $webhookUrl `
        -Method POST `
        -Body $testData `
        -ContentType "application/json" `
        -ErrorAction Stop

    Write-Host "`n✅ Réponse reçue (Code: $($response.StatusCode))" -ForegroundColor Green
    Write-Host "`n📄 Contenu de la réponse:" -ForegroundColor Cyan
    $responseContent = $response.Content | ConvertFrom-Json
    Write-Host ($responseContent | ConvertTo-Json -Depth 10) -ForegroundColor Green

    if ($responseContent.success) {
        Write-Host "`n🎉 Test réussi! Les données ont été traités" -ForegroundColor Green
        Write-Host "   Client ID: $($responseContent.clientId)" -ForegroundColor Gray
        Write-Host "   Feedback ID: $($responseContent.feedbackId)" -ForegroundColor Gray
        Write-Host "`n✨ Vérifications à faire:" -ForegroundColor Yellow
        Write-Host "   1. Vérifie Notion pour voir le nouveau client et feedback" -ForegroundColor Gray
        Write-Host "   2. Vérifie ton email pour le message de remerciement" -ForegroundColor Gray
    } else {
        Write-Host "`n❌ Erreur: $($responseContent.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "`n❌ Erreur lors de l'envoi de la requête:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.Exception.Message -like "*refused*") {
        Write-Host "`n⚠️  Le serveur n'est pas accessible sur $webhookUrl" -ForegroundColor Yellow
        Write-Host "   Assure-toi que 'npm run dev' est en cours d'exécution" -ForegroundColor Yellow
    }
}

Write-Host "`n" -ForegroundColor Gray
