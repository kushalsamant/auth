$repoPath = "C:\Users\ADMIN\Documents\GitHub\auth"
$exclude = @('.next', 'node_modules', '.git', 'dist', '.vercel')

[System.IO.Directory]::GetFiles($repoPath, '*', [System.IO.SearchOption]::AllDirectories) |
  Where-Object {
    $excluded = $false
    foreach ($ex in $exclude) { if ($_ -like "*\$ex\*") { $excluded = $true; break } }
    -not $excluded
  } |
  ForEach-Object {
    try {
      $content = [System.IO.File]::ReadAllText($_)
      if ($content -match 'platform-auth|platform_auth') {
        $newContent = $content -replace 'platform-auth', 'auth' -replace 'platform_auth', 'auth'
        [System.IO.File]::WriteAllText($_, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "OK: $_" -ForegroundColor Green
      }
    } catch {
      Write-Host "ERROR: $_" -ForegroundColor Red
    }
  }

Write-Host "Done"
