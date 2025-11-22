Write-Host 'Testing single register endpoint...'
try {
    $body = @{
        name = 'TestUser'
        email = 'testuser1@test.com'
        password = 'test123'
    } | ConvertTo-Json
    
    Write-Host "Sending request to http://localhost:4000/auth/register"
    Write-Host "Body: $body"
    
    $resp = Invoke-RestMethod -Uri 'http://localhost:4000/auth/register' -Method POST -ContentType 'application/json' -Body $body -TimeoutSec 5
    
    Write-Host "Response received:"
    Write-Host ($resp | ConvertTo-Json -Depth 5)
}
catch {
    Write-Host "Error: $_"
    Write-Host $_.Exception
}
