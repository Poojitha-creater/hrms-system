Write-Host 'Testing Teams endpoints...'

Write-Host "`n--- LOGIN to get fresh token ---"
try {
    $loginBody = @{
        email = 'testuser1@test.com'
        password = 'test123'
    } | ConvertTo-Json
    
    $loginResp = Invoke-RestMethod -Uri 'http://localhost:4000/auth/login' -Method POST -ContentType 'application/json' -Body $loginBody
    $token = $loginResp.token
    Write-Host "Token obtained"
}
catch {
    Write-Host "Login failed: $_"
    exit 1
}

$headers = @{ Authorization = "Bearer $token" }

Write-Host "`n--- GET /teams (public) ---"
try {
    $resp = Invoke-RestMethod -Uri 'http://localhost:4000/teams' -Method GET
    Write-Host "Count: $($resp.Count), Response:"
    Write-Host ($resp | ConvertTo-Json -Depth 3)
}
catch {
    Write-Host "Error: $_"
}

Write-Host "`n--- POST /teams (create Engineering team) ---"
try {
    $body = @{
        name = 'Engineering'
        description = 'Backend and Frontend developers'
    } | ConvertTo-Json
    
    $resp = Invoke-RestMethod -Uri 'http://localhost:4000/teams' -Method POST -Headers $headers -ContentType 'application/json' -Body $body
    Write-Host "Created:"
    Write-Host ($resp | ConvertTo-Json -Depth 3)
    $teamId = $resp.id
}
catch {
    Write-Host "Error: $_"
    exit 1
}

Write-Host "`n--- GET /teams after POST ---"
try {
    $resp = Invoke-RestMethod -Uri 'http://localhost:4000/teams' -Method GET
    Write-Host "Count: $($resp.Count)"
    Write-Host ($resp | ConvertTo-Json -Depth 3)
}
catch {
    Write-Host "Error: $_"
}

Write-Host "`n--- POST /teams (duplicate name - expect error) ---"
try {
    $body = @{
        name = 'Engineering'
        description = 'Another team with same name'
    } | ConvertTo-Json
    
    $resp = Invoke-RestMethod -Uri 'http://localhost:4000/teams' -Method POST -Headers $headers -ContentType 'application/json' -Body $body
    Write-Host "Response (unexpected success):"
    Write-Host ($resp | ConvertTo-Json -Depth 3)
}
catch {
    Write-Host "Error (expected): $($_.Exception.Response.StatusCode) - $($_.Exception.Message)"
}

Write-Host "`n--- POST /teams (missing name - expect error) ---"
try {
    $body = @{
        description = 'Team without name'
    } | ConvertTo-Json
    
    $resp = Invoke-RestMethod -Uri 'http://localhost:4000/teams' -Method POST -Headers $headers -ContentType 'application/json' -Body $body
    Write-Host "Response (unexpected success):"
    Write-Host ($resp | ConvertTo-Json -Depth 3)
}
catch {
    Write-Host "Error (expected): $($_.Exception.Response.StatusCode)"
}

Write-Host "`nTeams tests complete."
