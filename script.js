document.addEventListener('DOMContentLoaded', () => {

    // Exit script if it's not the controls page
    if (!document.getElementById('controls-panel')) return;

    // --- Element Selections ---
    const root = document.documentElement;
    const glassButton = document.querySelector('.glass');
    const panel = document.getElementById('controls-panel');
    const panelHeader = document.getElementById('panel-header');
    
    // Control elements
    const masterToggle = document.getElementById('master-toggle');
    const settingsContainer = document.getElementById('settings-container');
    const blurSlider = document.getElementById('blur-slider');
    const opacitySlider = document.getElementById('opacity-slider');
    const sizeSlider = document.getElementById('size-slider');
    const radiusSlider = document.getElementById('radius-slider');
    const borderSlider = document.getElementById('border-slider');
    const iconColorPicker = document.getElementById('icon-color-picker');
    const shadowToggle = document.getElementById('shadow-toggle');

    // Value display elements
    const blurValue = document.getElementById('blur-value');
    const opacityValue = document.getElementById('opacity-value');
    const sizeValue = document.getElementById('size-value');
    const radiusValue = document.getElementById('radius-value');
    const borderValue = document.getElementById('border-value');

    // --- Core Function to Update Styles ---
    const updateGlassEffect = () => {
        // 1. Update CSS Variables for the live glass element on screen
        root.style.setProperty('--glass-blur', `${blurSlider.value}px`);
        root.style.setProperty('--glass-alpha', opacitySlider.value / 100);
        root.style.setProperty('--glass-size', `${sizeSlider.value}rem`);
        root.style.setProperty('--glass-border-radius', `${radiusSlider.value}%`);
        root.style.setProperty('--glass-border-width', `${borderSlider.value}px`);
        root.style.setProperty('--glass-icon-color', iconColorPicker.value);
        root.style.setProperty('--shadow-opacity', shadowToggle.checked ? 1 : 0);

        // 2. Update the text values next to sliders
        blurValue.textContent = blurSlider.value;
        opacityValue.textContent = opacitySlider.value;
        sizeValue.textContent = sizeSlider.value;
        radiusValue.textContent = radiusSlider.value;
        borderValue.textContent = borderSlider.value;
    };

    // --- Event Listeners ---
    const controls = [
        masterToggle, blurSlider, opacitySlider, sizeSlider,
        radiusSlider, borderSlider, iconColorPicker, shadowToggle
    ];

    controls.forEach(control => {
        control.addEventListener('input', updateGlassEffect);
    });

    masterToggle.addEventListener('change', () => {
        glassButton.classList.toggle('hidden', !masterToggle.checked);
        settingsContainer.style.display = masterToggle.checked ? 'block' : 'none';
    });
    
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

    // --- Initial Call ---
    updateGlassEffect();
});
