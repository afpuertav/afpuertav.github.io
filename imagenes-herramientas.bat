@echo off
rem ===========================================================================
rem  imagenes-herramientas.bat
rem  Extrae el .docx (que es un ZIP) y copia sus 13 imagenes a la carpeta de
rem  la presentacion, con nombres descriptivos.
rem  NO borra nada: la limpieza se hace despues de verificar.
rem ===========================================================================

cd /d "%~dp0"
set "LOG=%~dp0imagenes-log.txt"
set "TMP=%~dp0_tmp_docx"
set "SRC=%~dp0_tmp_docx\contenido\word\media"
set "DEST=%~dp0courses\machine_learning_regresion\Herramientas\imgs"
set "DOC=%USERPROFILE%\Downloads\Tutorial de descarga de herramientas necesarias.docx"

echo === imagenes-herramientas.bat  %DATE% %TIME% === > "%LOG%"

if not exist "%DOC%" (
    echo ERROR: no existe el .docx en Descargas >> "%LOG%"
    goto :fin
)

if exist "%TMP%" rmdir /s /q "%TMP%"
mkdir "%TMP%"
copy /b /y "%DOC%" "%TMP%\documento.zip" > nul 2>&1

powershell -NoProfile -Command "Expand-Archive -LiteralPath '%TMP%\documento.zip' -DestinationPath '%TMP%\contenido' -Force" >> "%LOG%" 2>&1

if not exist "%SRC%\image1.png" (
    echo ERROR: la extraccion no produjo las imagenes >> "%LOG%"
    goto :fin
)

echo Extraccion OK >> "%LOG%"

if not exist "%DEST%" mkdir "%DEST%"

copy /b /y "%SRC%\image1.png"  "%DEST%\01-python-downloads.png"        >> "%LOG%" 2>&1
copy /b /y "%SRC%\image2.png"  "%DEST%\02-python-releases-windows.png" >> "%LOG%" 2>&1
copy /b /y "%SRC%\image3.png"  "%DEST%\03-ciclo-de-versiones.png"      >> "%LOG%" 2>&1
copy /b /y "%SRC%\image4.png"  "%DEST%\04-qr-python-3-12-10.png"       >> "%LOG%" 2>&1
copy /b /y "%SRC%\image5.png"  "%DEST%\05-elegir-instalador.png"       >> "%LOG%" 2>&1
copy /b /y "%SRC%\image6.png"  "%DEST%\06-abrir-la-descarga.png"       >> "%LOG%" 2>&1
copy /b /y "%SRC%\image7.png"  "%DEST%\07-qr-vscode.png"               >> "%LOG%" 2>&1
copy /b /y "%SRC%\image8.png"  "%DEST%\08-vscode-descargar.png"        >> "%LOG%" 2>&1
copy /b /y "%SRC%\image9.png"  "%DEST%\09-vscode-abrir-descarga.png"   >> "%LOG%" 2>&1
copy /b /y "%SRC%\image10.png" "%DEST%\10-vscode-licencia.png"         >> "%LOG%" 2>&1
copy /b /y "%SRC%\image11.png" "%DEST%\11-vscode-opciones-path.png"    >> "%LOG%" 2>&1
copy /b /y "%SRC%\image12.png" "%DEST%\12-vscode-instalando.png"       >> "%LOG%" 2>&1
copy /b /y "%SRC%\image13.png" "%DEST%\13-vscode-abierto.png"          >> "%LOG%" 2>&1

echo. >> "%LOG%"
echo Contenido de la carpeta imgs: >> "%LOG%"
dir /b "%DEST%" >> "%LOG%" 2>&1

:fin
echo.
echo Listo. Revisa imagenes-log.txt
timeout /t 5 /nobreak > nul
