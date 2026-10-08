# Merender ikon Visual MTK ("Puzzle Operator") menjadi PNG dan favicon.ico.
#
# Geometrinya sama persis dengan public/favicon.svg (kisi 32x32). Dipakai hanya
# bila bentuk atau warna ikon berubah; hasilnya ikut di-commit di public/.
#   powershell -ExecutionPolicy Bypass -File scripts/render-icons.ps1

Add-Type -AssemblyName System.Drawing

$akar = Split-Path -Parent $PSScriptRoot
$keluar = Join-Path $akar 'public'

$UBIN = [System.Drawing.ColorTranslator]::FromHtml('#6445df')
$KRIM = [System.Drawing.ColorTranslator]::FromHtml('#fffaf2')
$LEMON = [System.Drawing.ColorTranslator]::FromHtml('#e0c931')
$LANGIT = [System.Drawing.ColorTranslator]::FromHtml('#65e0e7')

function New-Ikon {
  param(
    [int]$Ukuran,       # sisi PNG dalam piksel
    [double]$Skala,     # skala glif terhadap pusat (1 = favicon, 0.8 = aplikasi, 0.62 = maskable)
    [double]$Sudut      # radius sudut ubin dalam satuan kisi 32 (0 = persegi penuh)
  )
  $bmp = New-Object System.Drawing.Bitmap($Ukuran, $Ukuran, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear([System.Drawing.Color]::Transparent)

  $s = $Ukuran / 32.0
  $g.ScaleTransform($s, $s)

  # Ubin latar
  $kuas = New-Object System.Drawing.SolidBrush($UBIN)
  if ($Sudut -le 0) {
    $g.FillRectangle($kuas, 0, 0, 32, 32)
  } else {
    $d = [float]($Sudut * 2)
    $jalur = New-Object System.Drawing.Drawing2D.GraphicsPath
    $jalur.AddArc(0, 0, $d, $d, 180, 90)
    $jalur.AddArc(32 - $d, 0, $d, $d, 270, 90)
    $jalur.AddArc(32 - $d, 32 - $d, $d, $d, 0, 90)
    $jalur.AddArc(0, 32 - $d, $d, $d, 90, 90)
    $jalur.CloseFigure()
    $g.FillPath($kuas, $jalur)
    $jalur.Dispose()
  }
  $kuas.Dispose()

  # Glif diperkecil terhadap pusat ubin
  $g.TranslateTransform(16, 16)
  $g.ScaleTransform([float]$Skala, [float]$Skala)
  $g.TranslateTransform(-16, -16)

  function Garis($warna, [double]$tebal, [double]$x1, [double]$y1, [double]$x2, [double]$y2) {
    $pena = New-Object System.Drawing.Pen($warna, [float]$tebal)
    $pena.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pena.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($pena, [float]$x1, [float]$y1, [float]$x2, [float]$y2)
    $pena.Dispose()
  }
  function Bulat($warna, [double]$cx, [double]$cy, [double]$r) {
    $k = New-Object System.Drawing.SolidBrush($warna)
    $g.FillEllipse($k, [float]($cx - $r), [float]($cy - $r), [float]($r * 2), [float]($r * 2))
    $k.Dispose()
  }

  # +  (dua bilah 8.5 x 2.5, ujung bulat)
  Garis $KRIM 2.5 7 10 13 10
  Garis $KRIM 2.5 10 7 10 13
  # −
  Garis $LEMON 2.5 19 10 25 10
  # %
  Bulat $LANGIT 7.3 19.3 1.7
  Bulat $LANGIT 12.7 24.7 1.7
  Garis $LANGIT 2.2 13 19 7 25
  # ×
  Garis $KRIM 2.5 19 19 25 25
  Garis $KRIM 2.5 25 19 19 25

  $g.Dispose()
  return $bmp
}

function Save-Png($bmp, [string]$nama) {
  $jalur = Join-Path $keluar $nama
  $bmp.Save($jalur, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Output ("{0}  {1} byte" -f $nama, (Get-Item $jalur).Length)
}

# Ikon layar utama iPhone: persegi penuh (iOS memotong sudutnya sendiri).
$b = New-Ikon -Ukuran 180 -Skala 0.8 -Sudut 0;     Save-Png $b 'apple-touch-icon.png'; $b.Dispose()
# Ikon PWA "any"
$b = New-Ikon -Ukuran 192 -Skala 0.8 -Sudut 7.2;   Save-Png $b 'icon-192.png'; $b.Dispose()
$b = New-Ikon -Ukuran 512 -Skala 0.8 -Sudut 7.2;   Save-Png $b 'icon-512.png'; $b.Dispose()
# Ikon PWA "maskable"
$b = New-Ikon -Ukuran 192 -Skala 0.62 -Sudut 0;    Save-Png $b 'icon-maskable-192.png'; $b.Dispose()
$b = New-Ikon -Ukuran 512 -Skala 0.62 -Sudut 0;    Save-Png $b 'icon-maskable-512.png'; $b.Dispose()

# favicon.ico berisi PNG 16, 32, dan 48 (untuk peramban yang belum membaca favicon SVG).
$ukuranIco = 16, 32, 48
$isi = @()
foreach ($u in $ukuranIco) {
  $b = New-Ikon -Ukuran $u -Skala 1 -Sudut 7.5
  $ms = New-Object System.IO.MemoryStream
  $b.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
  $isi += , $ms.ToArray()
  $ms.Dispose(); $b.Dispose()
}
$ico = New-Object System.IO.MemoryStream
$tulis = New-Object System.IO.BinaryWriter($ico)
$tulis.Write([uint16]0); $tulis.Write([uint16]1); $tulis.Write([uint16]$ukuranIco.Count)
$geser = 6 + 16 * $ukuranIco.Count
for ($i = 0; $i -lt $ukuranIco.Count; $i++) {
  $tulis.Write([byte]$ukuranIco[$i]); $tulis.Write([byte]$ukuranIco[$i])
  $tulis.Write([byte]0); $tulis.Write([byte]0)
  $tulis.Write([uint16]1); $tulis.Write([uint16]32)
  $tulis.Write([uint32]$isi[$i].Length); $tulis.Write([uint32]$geser)
  $geser += $isi[$i].Length
}
foreach ($d in $isi) { $tulis.Write($d) }
$tulis.Flush()
[System.IO.File]::WriteAllBytes((Join-Path $keluar 'favicon.ico'), $ico.ToArray())
Write-Output ("favicon.ico  {0} byte" -f $ico.Length)
$tulis.Dispose(); $ico.Dispose()
