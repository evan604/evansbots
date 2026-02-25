# Stable Diffusion WebUI Setup — Mac Mini (Apple Silicon)

## System Requirements
- **Mac:** Mac mini with M1/M2/M3 chip (Apple Silicon)
- **RAM:** 16GB+ recommended (8GB works but slow)
- **Storage:** ~10GB for base install + models
- **macOS:** 12.3+ (Monterey or newer)

## Installation Steps

### 1. Install Prerequisites

Homebrew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Python 3.10:
```bash
brew install python@3.10
```

Git:
```bash
brew install git
```

### 2. Clone WebUI Repo

```bash
cd ~
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
```

### 3. Download a Model

**Recommended starter models:**
- SD 1.5: `v1-5-pruned-emaonly.safetensors` (~4GB)
- SDXL: `sd_xl_base_1.0.safetensors` (~7GB)

Download and place in:
```
~/stable-diffusion-webui/models/Stable-diffusion/
```

### 4. Launch WebUI

```bash
cd ~/stable-diffusion-webui
./webui.sh
```

**First launch:** Downloads additional dependencies (~5-10 min)

### 5. Access the UI

Open browser: http://127.0.0.1:7860

---

## Performance Tips (Mac)

### For 8GB RAM Macs:
- Use `--lowvram` flag
- Generate smaller images (512x512 max)
- Close other apps

### For 16GB+ RAM Macs:
- Normal operation
- Can do 1024x1024 with SDXL

### Speed Optimization:
- Use `--no-half` flag for MPS
- Use `--opt-sub-quad-attention` for better memory usage
- Add `--use-cpu torch` if crashes occur

---

## Launch Script (Optimized for Mac)

Create `~/stable-diffusion-webui/start-mac.sh`:
```bash
#!/bin/bash
cd ~/stable-diffusion-webui
./webui.sh --precision full --no-half --opt-sub-quad-attention
```

Make executable:
```bash
chmod +x ~/stable-diffusion-webui/start-mac.sh
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "MPS backend" errors | Add `--no-half --precision full` |
| Out of memory | Add `--lowvram` or `--medvram` |
| Slow generation | Normal on Mac, try smaller images |
| Models not showing | Check file extension is `.safetensors` or `.ckpt` |

---

## Workflow

1. **Start WebUI:** `./start-mac.sh`
2. **Open browser:** http://127.0.0.1:7860
3. **Enter prompt:** Describe what you want
4. **Generate:** Hit Generate button
5. **Save:** Images auto-save to `outputs/`

---

## Quick Test Prompts

| Use Case | Prompt |
|----------|--------|
| Blog thumbnail | "Professional blog header, minimalist, tech theme, high quality, 4k" |
| Social media | "Eye-catching social media graphic, bold colors, modern design" |
| Avatar | "Professional headshot, studio lighting, neutral background, high quality" |

---

*Setup started: 2026-02-25*
