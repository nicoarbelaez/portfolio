#!/usr/bin/env bash
set -euo pipefail

echo "=== prepare-pdf: starting ==="

# Virtualenv location (evita conflictos con .venv de desarrollo)
VENV_DIR=".venv_build"

# Si quieres forzar recreación cada build, elimina anterior:
if [ -d "$VENV_DIR" ]; then
  rm -rf "$VENV_DIR"
fi

# Crear virtualenv con python3 disponible en el builder (Vercel usa linux)
python3 -m venv "$VENV_DIR"
# activar
source "$VENV_DIR/bin/activate"

# Actualizar pip y wheel
pip install --upgrade pip wheel setuptools

# Instalar requerimientos
if [ -f "requirements.txt" ]; then
  pip install -r requirements.txt
else
  echo "requirements.txt no encontrado en la raíz; saliendo con error."
  exit 1
fi

# Ruta de salida deseada (debe existir public o crearla)
OUT_PATH="./public/resume.pdf"
mkdir -p "$(dirname "$OUT_PATH")"

# Ejecutar rendercv usando python -m (evita depender de rendercv en PATH)
python -m rendercv render "rendercv.yaml" \
  --dont-generate-markdown \
  --dont-generate-html \
  --dont-generate-png \
  --pdf-path "${OUT_PATH}"

echo "=== prepare-pdf: generated ${OUT_PATH} ==="

# Desactivar virtualenv (opcional)
deactivate || true

echo "=== prepare-pdf: done ==="
