Write-Host 'Starting API test script';

Write-Host '--- REGISTER (valid) ---';
curl.exe -i -X POST http://localhost:4000/auth/register -H "Content-Type: application/json" -d '{"name":"Test User","email":"testuser@example.com","password":"pass123"}'

Write-Host "`n--- REGISTER (duplicate) ---";
curl.exe -i -X POST http://localhost:4000/auth/register -H "Content-Type: application/json" -d '{"name":"Test User","email":"testuser@example.com","password":"pass123"}'

Write-Host "`n--- LOGIN (valid) ---";
$login = Invoke-RestMethod -Uri 'http://localhost:4000/auth/login' -Method Post -ContentType 'application/json' -Body '{"email":"testuser@example.com","password":"pass123"}';
$token = $login.token;
Write-Host "Token: $token";

Write-Host "`n--- GET /employees (public) ---";
curl.exe -i http://localhost:4000/employees

Write-Host "`n--- POST /employees (with token) ---";
$empAdd = Invoke-RestMethod -Uri 'http://localhost:4000/employees' -Method Post -Headers @{ Authorization = "Bearer $token" } -ContentType 'application/json' -Body '{"name":"Alice","email":"alice@example.com","position":"Engineer","phone":"123"}';
$empAdd | ConvertTo-Json -Depth 5 | Write-Host

Write-Host "`n--- GET /employees after add ---";
curl.exe -i http://localhost:4000/employees

Write-Host "`n--- DELETE first employee (with token) ---";
$all = Invoke-RestMethod 'http://localhost:4000/employees';
if ($all -and $all.Count -gt 0) {
  $id = $all[0].id; Write-Host "Deleting id: $id";
  Invoke-RestMethod -Uri "http://localhost:4000/employees/$id" -Method Delete -Headers @{ Authorization = "Bearer $token" } | ConvertTo-Json -Depth 5 | Write-Host
} else { Write-Host 'No employees to delete' }

Write-Host "`n--- TEAMS: GET ---";
curl.exe -i http://localhost:4000/teams

Write-Host "`n--- TEAMS: POST (with token) ---";
$team = Invoke-RestMethod -Uri 'http://localhost:4000/teams' -Method Post -Headers @{ Authorization = "Bearer $token" } -ContentType 'application/json' -Body '{"name":"Engineering","description":"Dev team"}';
$team | ConvertTo-Json -Depth 5 | Write-Host

Write-Host "`n--- ASSIGN: create employee and assign to team ---";
$emp = Invoke-RestMethod -Uri 'http://localhost:4000/employees' -Method Post -Headers @{ Authorization = "Bearer $token" } -ContentType 'application/json' -Body '{"name":"Bob","email":"bob@example.com","position":"Dev","phone":"555"}';
Write-Host 'Created employee:'; $emp | ConvertTo-Json -Depth 5 | Write-Host
Write-Host 'Assigning:';
$body = @{ employeeId = $emp.id; teamId = $team.id } | ConvertTo-Json;
$assign = Invoke-RestMethod -Uri 'http://localhost:4000/assign' -Method Post -Headers @{ Authorization = "Bearer $token" } -ContentType 'application/json' -Body $body;
$assign | ConvertTo-Json -Depth 5 | Write-Host

Write-Host "`n--- ASSIGN invalid employee ---";
try {
  $bad = Invoke-RestMethod -Uri 'http://localhost:4000/assign' -Method Post -Headers @{ Authorization = "Bearer $token" } -ContentType 'application/json' -Body '{"employeeId":99999,"teamId":1}';
  $bad | ConvertTo-Json -Depth 5 | Write-Host
} catch {
  try { Write-Host $_.Exception.Response.Content.ReadAsStringAsync().Result } catch { Write-Host $_ }
}

Write-Host 'API test script finished';
