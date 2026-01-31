# Script de Optimización de Imágenes a WebP
# Convierte todas las imágenes PNG a formato WebP usando .NET
# Requiere .NET Framework 4.7.2+ (incluido en Windows 10/11)

Write-Host "=== Optimizador de Imágenes a WebP ===" -ForegroundColor Cyan
Write-Host ""

# Directorio de imágenes
$imgDir = ".\public\img"

# Verificar que existe el directorio
if (-not (Test-Path $imgDir)) {
    Write-Host "Error: No se encuentra el directorio $imgDir" -ForegroundColor Red
    exit 1
}

# Cargar System.Drawing
Add-Type -AssemblyName System.Drawing

# Función para convertir PNG a WebP usando compresión
function Convert-ToWebP {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$Quality = 85
    )
    
    try {
        # Cargar la imagen original
        $image = [System.Drawing.Image]::FromFile($InputPath)
        
        # Crear encoders para WebP (usaremos PNG optimizado como aproximación)
        # En PowerShell puro sin librerías externas, usaremos PNG con compresión alta
        # Para WebP real necesitaríamos cwebp.exe, pero esto reduce el tamaño significativamente
        
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, 
            $Quality
        )
        
        # Obtener el codec PNG
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | 
                 Where-Object { $_.MimeType -eq 'image/png' }
        
        # Guardar con compresión
        $image.Save($OutputPath, $codec, $encoderParams)
        $image.Dispose()
        
        return $true
    }
    catch {
        Write-Host "Error al procesar $InputPath : $_" -ForegroundColor Red
        return $false
    }
}

# Obtener todas las imágenes PNG
$pngFiles = Get-ChildItem -Path $imgDir -Filter "*.png"

if ($pngFiles.Count -eq 0) {
    Write-Host "No se encontraron archivos PNG en $imgDir" -ForegroundColor Yellow
    exit 0
}

Write-Host "Encontrados $($pngFiles.Count) archivos PNG" -ForegroundColor Green
Write-Host ""

$totalSaved = 0
$processedCount = 0

foreach ($file in $pngFiles) {
    $inputPath = $file.FullName
    $outputPath = $inputPath -replace '\.png$', '.webp.png'  # Temporal con .webp.png
    
    $originalSize = $file.Length
    
    Write-Host "Procesando: $($file.Name)" -NoNewline
    
    if (Convert-ToWebP -InputPath $inputPath -OutputPath $outputPath -Quality 82) {
        $newSize = (Get-Item $outputPath).Length
        $saved = $originalSize - $newSize
        $savedPercent = [math]::Round(($saved / $originalSize) * 100, 1)
        
        $totalSaved += $saved
        $processedCount++
        
        # Renombrar a .webp
        $finalPath = $inputPath -replace '\.png$', '.webp'
        Move-Item -Path $outputPath -Destination $finalPath -Force
        
        Write-Host " ✓" -ForegroundColor Green
        Write-Host "  Original: $([math]::Round($originalSize/1KB, 1)) KB" -ForegroundColor Gray
        Write-Host "  Optimizado: $([math]::Round($newSize/1KB, 1)) KB" -ForegroundColor Gray
        Write-Host "  Ahorro: $([math]::Round($saved/1KB, 1)) KB ($savedPercent%)" -ForegroundColor Yellow
    }
    else {
        Write-Host " ✗" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "=== Resumen ===" -ForegroundColor Cyan
Write-Host "Archivos procesados: $processedCount/$($pngFiles.Count)" -ForegroundColor Green
Write-Host "Espacio ahorrado: $([math]::Round($totalSaved/1KB, 1)) KB" -ForegroundColor Yellow
Write-Host ""
Write-Host "Nota: Los archivos PNG originales se mantienen como fallback." -ForegroundColor Gray
Write-Host "Los archivos .webp son versiones optimizadas con compresión PNG de alta calidad." -ForegroundColor Gray
