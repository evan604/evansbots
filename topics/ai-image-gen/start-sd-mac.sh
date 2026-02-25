#!/bin/bash
# Stable Diffusion WebUI Launcher for Mac (Apple Silicon)
# Optimized for M-series chips

cd ~/stable-diffusion-webui

# Mac-optimized flags:
# --precision full --no-half: Fixes MPS backend issues on Apple Silicon
# --opt-sub-quad-attention: Better memory usage
# --skip-torch-cuda-test: Skip CUDA check (Mac uses MPS not CUDA)

./webui.sh \
  --precision full \
  --no-half \
  --opt-sub-quad-attention \
  --skip-torch-cuda-test \
  "$@"
