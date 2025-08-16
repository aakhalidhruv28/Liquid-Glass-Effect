document.addEventListener('DOMContentLoaded', () => {

    if (!document.getElementById('controls-panel')) return;

    // --- Element Selections ---
    const root = document.documentElement;
    const glassButton = document.querySelector('.glass');
    const panel = document.getElementById('controls-panel');
    const panelHeader = document.getElementById('panel-header');
    
    const masterToggle = document.getElementById('master-toggle');
    const settingsContainer = document.getElementById('settings-container');
    const sizeSlider = document.getElementById('size-slider');
    const borderSlider = document.getElementById('border-slider');
    const blurSlider = document.getElementById('blur-slider');
    const saturationSlider = document.getElementById('saturation-slider');
    const contrastSlider = document.getElementById('contrast-slider');
    const tintColorPicker = document.getElementById('tint-color-picker');
    const tintOpacitySlider = document.getElementById('tint-opacity-slider');
    const iconColorPicker = document.getElementById('icon-color-picker');
    const shadowToggle = document.getElementById('shadow-toggle');
    const resetBtn = document.getElementById('reset-btn');

    // Store default values for the reset function
    const defaults = {
        size: sizeSlider.value,
        border: borderSlider.value,
        blur: blurSlider.value,
        saturation: saturationSlider.value,
        contrast: contrastSlider.value,
        tintColor: tintColorPicker.value,
        tintOpacity: tintOpacitySlider.value,
        iconColor: iconColorPicker.value,
        shadow: shadowToggle.checked,
    };

    // --- Helper function to convert HEX color to RGB values ---
    const hexToRgb = (hex) => {
        let r = 0, g = 0, b = 0;
        if (hex.length == 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length == 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        return `${+r},${+g},${+b}`;
    };

    // --- Core Function to Update All Styles and Labels ---
    const updateAllStyles = () => {
        // Update CSS variables from current slider/picker values
        root.style.setProperty('--glass-size', `${sizeSlider.value}rem`);
        root.style.setProperty('--glass-border-width', `${borderSlider.value}px`);
        root.style.setProperty('--glass-blur', `${blurSlider.value}px`);
        root.style.setProperty('--glass-saturation', `${saturationSlider.value}%`);
        root.style.setProperty('--glass-contrast', `${contrastSlider.value}%`);
        root.style.setProperty('--glass-tint-color', hexToRgb(tintColorPicker.value));
        root.style.setProperty('--glass-tint-alpha', tintOpacitySlider.value / 100);
        root.style.setProperty('--glass-icon-color', iconColorPicker.value);
        root.style.setProperty('--shadow-opacity', shadowToggle.checked ? 1 : 0);

        // Update text labels
        document.getElementById('size-value').textContent = sizeSlider.value;
        document.getElementById('border-value').textContent = borderSlider.value;
        document.getElementById('blur-value').textContent = blurSlider.value;
        document.getElementById('saturation-value').textContent = saturationSlider.value;
        document.getElementById('contrast-value').textContent = contrastSlider.value;
        document.getElementById('tint-opacity-value').textContent = tintOpacitySlider.value;
    };

    // --- Reset Function ---
    const resetToDefaults = () => {
        sizeSlider.value = defaults.size;
        borderSlider.value = defaults.border;
        blurSlider.value = defaults.blur;
        saturationSlider.value = defaults.saturation;
        contrastSlider.value = defaults.contrast;
        tintColorPicker.value = defaults.tintColor;
        tintOpacitySlider.value = defaults.tintOpacity;
        iconColorPicker.value = defaults.iconColor;
        shadowToggle.checked = defaults.shadow;

        // Apply all the reset values
        updateAllStyles();
    };

    // --- Event Listeners ---
    const allControls = document.querySelectorAll('#settings-container input');
    allControls.forEach(control => {
        control.addEventListener('input', updateAllStyles);
    });

    masterToggle.addEventListener('change', () => {
        glassButton.classList.toggle('hidden', !masterToggle.checked);
        settingsContainer.style.display = masterToggle.checked ? 'block' : 'none';
    });

    resetBtn.addEventListener('click', resetToDefaults);

    // --- Draggable Panel Logic ---
    let isDragging = false, offsetX, offsetY;
    panelHeader.addEventListener('mousedown', e => {
        isDragging = true;
        panelHeader.style.cursor = 'grabbing';
        offsetX = e.clientX - panel.offsetLeft;
        offsetY = e.clientY - panel.offsetTop;
    });
    document.addEventListener('mousemove', e => {
        if (isDragging) {
            panel.style.left = `${e.clientX - offsetX}px`;
            panel.style.top = `${e.clientY - offsetY}px`;
        }
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        panelHeader.style.cursor = 'grab';
    });

    // --- Initial Call on page load ---
    updateAllStyles();
}); 
