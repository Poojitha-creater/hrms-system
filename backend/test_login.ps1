Write-Host 'Testing single login endpoint...'
try {
    $body = @{
        email = 'testuser1@test.com'
        password = 'test123'
    } | ConvertTo-Json
    
    Write-Host "Sending login request..."
    Write-Host "Body: $body"
    
    $resp = Invoke-RestMethod -Uri 'http://localhost:4000/auth/login' -Method POST -ContentType 'application/json' -Body $body -TimeoutSec 5
    
    Write-Host "Login response:"
    Write-Host ($resp | ConvertTo-Json -Depth 5)
}
catch {
    Write-Host "Error: $_"
}
