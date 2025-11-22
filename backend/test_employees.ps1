Write-Host 'Testing Employees endpoints (fresh login)...'

Write-Host "`n--- LOGIN to get fresh token ---"
try {
    $loginBody = @{
        email = 'testuser1@test.com'
        password = 'test123'
    } | ConvertTo-Json
    
    $loginResp = Invoke-RestMethod -Uri 'http://localhost:4000/auth/login' -Method POST -ContentType 'application/json' -Body $loginBody
    $token = $loginResp.token
    Write-Host "Token obtained: $($token.Substring(0, 30))..."
}
catch {
    Write-Host "Login failed: $_"
    exit 1
}

$headers = @{ Authorization = "Bearer $token" }

Write-Host "`n--- GET /employees (public) ---"
try {
    $resp = Invoke-RestMethod -Uri 'http://localhost:4000/employees' -Method GET
    Write-Host "Count: $($resp.Count), Response:"
    Write-Host ($resp | ConvertTo-Json -Depth 3)
}
catch {
    Write-Host "Error: $_"
}

Write-Host "`n--- POST /employees (add Alice) ---"
try {
    $body = @{
        name = 'Alice'
        email = 'alice@test.com'
        position = 'Engineer'
        phone = '1234567890'
    } | ConvertTo-Json
    
    $resp = Invoke-RestMethod -Uri 'http://localhost:4000/employees' -Method POST -Headers $headers -ContentType 'application/json' -Body $body
    Write-Host "Created:"
    Write-Host ($resp | ConvertTo-Json -Depth 3)
    $aliceId = $resp.id
}
catch {
    Write-Host "Error: $_"
    exit 1
}

Write-Host "`n--- GET /employees after add (expect 1) ---"
try {
    $resp = Invoke-RestMethod -Uri 'http://localhost:4000/employees' -Method GET
    Write-Host "Count: $($resp.Count)"
    Write-Host ($resp | ConvertTo-Json -Depth 3)
}
catch {
    Write-Host "Error: $_"
}

Write-Host "`n--- DELETE /employees/$aliceId ---"
try {
    $resp = Invoke-RestMethod -Uri "http://localhost:4000/employees/$aliceId" -Method DELETE -Headers $headers
    Write-Host "Deleted:"
    Write-Host ($resp | ConvertTo-Json -Depth 3)
}
catch {
    Write-Host "Error: $_"
}

Write-Host "`n--- POST /employees (missing required email - expect error) ---"
try {
    $body = @{
        name = 'Bob'
        position = 'Dev'
    } | ConvertTo-Json
    
    $resp = Invoke-RestMethod -Uri 'http://localhost:4000/employees' -Method POST -Headers $headers -ContentType 'application/json' -Body $body
    Write-Host "Response:"
    Write-Host ($resp | ConvertTo-Json -Depth 3)
}
catch {
    Write-Host "Error (expected): $($_.Exception.Response.StatusCode) - $($_.Exception.Message)"
}

Write-Host "`nEmployees tests complete."
