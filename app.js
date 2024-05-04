fabric.Object.prototype.objectCaching = true;
fabric.Object.prototype.set({
    borderColor: 'black',
    borderSize: 15,
    cornerColor: 'black', // Set corner color globally
    cornerSize: 10,  // Set corner size globally
    cornerStyle: 'circle',
    transparentCorners: false,
});

document.addEventListener('DOMContentLoaded', function () {
    var canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#ffffff',
        selection: true,
        selectionBorderColor: 'blue',
        preserveObjectStacking: true,
        uniScaleTransform: true,
        centeredScaling: true,
        isDrawingMode: false,
    });

    var isResizing = false;
    var origX, origY;
    var initialWidth, initialHeight;
    var textOptions = {
        fontStyle: 'italic',
        fontWeight: 'bold',
        textDecoration: 'none',
        fontFamily: 'Arial,poppins',
        fontSize: 20,
        fill: '#000000',
    };


    // Heart tool button
var addHeartButton = document.getElementById('addHeart');
addHeartButton.addEventListener('click', addHeart);

     // Function to add a heart to the canvas
function addHeart() {
  // Customize the heart properties as needed
  var heart = new fabric.Path('M 50 50 Q 50 10 80 10 Q 110 10 110 50 Q 110 90 80 120 Q 50 150 50 180 Q 50 150 20 120 Q -10 90 -10 50 Q -10 10 20 10 Q 50 10 50 50 Z', {
    left: 50,
    top: 50,
    fill: '#d62828', // Customize the fill color
    selectable: true,
  });

  // Add the heart to the canvas
  canvas.add(heart);
}



    // Arrow tool button
var addArrowButton = document.getElementById('addArrow');
addArrowButton.addEventListener('click', addArrow);

    // Function to add an arrow to the canvas
function addArrow() {
  // Customize the arrow properties as needed
  var arrow = new fabric.Path('M 0 0 L 20 10 L 0 20 L 5 10 L 0 0', {
    left: 50,
    top: 50,
    fill: '#540d6e', // Customize the fill color
    selectable: true,
  });

  // Add the arrow to the canvas
  canvas.add(arrow);
}


    // Star tool button
var addStarButton = document.getElementById('addStar');
addStarButton.addEventListener('click', addStar);

    // Function to add a star to the canvas
function addStar() {
  // Customize the star properties as needed
  var star = new fabric.Polygon([
    { x: 100, y: 10 },
    { x: 125, y: 75 },
    { x: 200, y: 75 },
    { x: 150, y: 125 },
    { x: 175, y: 200 },
    { x: 100, y: 150 },
    { x: 25, y: 200 },
    { x: 50, y: 125 },
    { x: 10, y: 75 },
    { x: 75, y: 75 },
  ], {
    left: 50,
    top: 50,
    fill: '#ffe100', // Customize the fill color
    selectable: true,
  });

  // Add the star to the canvas
  canvas.add(star);
}



     // Corner radius slider
    var cornerRadiusSlider = document.getElementById('rounderradiusSlider');
    cornerRadiusSlider.addEventListener('input', function () {
        applyCornerRadiusToSelectedObjects(parseFloat(cornerRadiusSlider.value));
    });

    function applyCornerRadiusToSelectedObjects(radius) {
        var activeObjects = canvas.getActiveObjects();

        activeObjects.forEach(function (obj) {
            if (obj instanceof fabric.Rect) {
                obj.set({
                    rx: radius * obj.width / 2, // Adjust as needed
                    ry: radius * obj.height / 2,
                });
            } else if (obj instanceof fabric.Image) {
                var clipPath = new fabric.Rect({
                    width: obj.width,
                    height: obj.height,
                    rx: radius * obj.width / 2,
                    ry: radius * obj.height / 2,
                    left: obj.left - obj.width /0,  // Adjust for the offset
                    top: obj.top - obj.height /0,    // Adjust for the offset
                });

                obj.set({
                    clipPath: clipPath,
                });
            }
        });

        canvas.renderAll();
    }
 

    // Drop shadow control
var shadowSlider = document.getElementById('shadowSlider');
var shadowLeftRightSlider = document.getElementById('shadowleftrightSlider');
var shadowTopBottomSlider = document.getElementById('shadowtopbottomSlider');
var shadowColorPicker = document.getElementById('shadowcolorPicker');

// Set initial values for the sliders to be centered
shadowLeftRightSlider.value = 0; // Centered horizontally
shadowTopBottomSlider.value = 0; // Centered vertically
shadowSlider.value = 0.5; // Initial opacity value
shadowColorPicker.value = '#000000'; // Initial shadow color

// Event listener for shadow opacity slider change
shadowSlider.addEventListener('input', function () {
    updateShadow();
});

// Event listener for shadow left-right positioning slider change
shadowLeftRightSlider.addEventListener('input', function () {
    updateShadow();
});

// Event listener for shadow top-bottom positioning slider change
shadowTopBottomSlider.addEventListener('input', function () {
    updateShadow();
});

// Event listener for shadow color picker change
shadowColorPicker.addEventListener('input', function () {
    updateShadow();
});

function updateShadow() {
    // Get selected objects
    var activeObjects = canvas.getActiveObjects();

    // Calculate the shadow position based on slider values
    var shadowOffsetX = parseFloat(shadowLeftRightSlider.value) * 20; // Adjust the multiplier as needed
    var shadowOffsetY = parseFloat(shadowTopBottomSlider.value) * 20; // Adjust the multiplier as needed
    var shadowBlur = parseFloat(shadowSlider.value) * 20; // Adjust the multiplier as needed

    // Apply drop shadow to selected objects
    activeObjects.forEach(function (obj) {
        obj.set({
            shadow: `${shadowColorPicker.value} ${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px`,
        });
    });

    // Update canvas
    canvas.renderAll();
}



     // Opacity slider control
    var opacitySlider = document.getElementById('opacitySlider');
    opacitySlider.addEventListener('input', function() {
      // Get selected objects
      var activeObjects = canvas.getActiveObjects();

      // Apply opacity to selected objects
      activeObjects.forEach(function(obj) {
        obj.set({ opacity: parseFloat(opacitySlider.value) });
      });

      // Update canvas
      canvas.renderAll();
    });

    // Function for the bring to front and send to back for all objectd
// Bring selected object to front
function bringToFront() {
    var activeObject = canvas.getActiveObject();

    if (activeObject) {
        canvas.bringToFront(activeObject);
        canvas.renderAll();
    }
}

// Send selected object to back
function sendToBack() {
    var activeObject = canvas.getActiveObject();

    if (activeObject) {
        canvas.sendToBack(activeObject);
        canvas.renderAll();
    }
}

// Add event listeners to your buttons
var bringToFrontButton = document.querySelector('.bringtofront');
bringToFrontButton.addEventListener('click', bringToFront);

var sendToBackButton = document.querySelector('.bringtoback');
sendToBackButton.addEventListener('click', sendToBack);


    
    // Event listener for line height input change
    var lineHeightInput = document.getElementById('lineheightvalue');
    lineHeightInput.addEventListener('input', function () {
        var selectedObject = canvas.getActiveObject();
        if (selectedObject && selectedObject.type === 'i-text') {
            var newLineHeight = parseInt(lineHeightInput.value, 10);
            selectedObject.set('lineHeight', newLineHeight);
            canvas.renderAll();
        }
    });

    // Event listener for text spacing input change
    var textSpacingInput = document.getElementById('textspacingvalue');
    textSpacingInput.addEventListener('input', function () {
        var selectedObject = canvas.getActiveObject();
        if (selectedObject && selectedObject.type === 'i-text') {
            var newTextSpacing = parseInt(textSpacingInput.value, 10);
            selectedObject.set('charSpacing', newTextSpacing);
            canvas.renderAll();
        }
    });

    // Text alignment buttons
    document.getElementById('aligntextleft').addEventListener('click', function () {
        setTextAlignment('left');
    });

    document.getElementById('aligntextcenter').addEventListener('click', function () {
        setTextAlignment('center');
    });

    document.getElementById('aligntextright').addEventListener('click', function () {
        setTextAlignment('right');
    });

    function setTextAlignment(alignment) {
        var activeObject = canvas.getActiveObject();

        if (activeObject && activeObject.type === 'i-text') {
            activeObject.set('textAlign', alignment);
            canvas.renderAll();
        }
    }

    // Font Family dropdown functionality
    var fontFamilyBtn = document.getElementById('fontfamilyBtn');
    var fontFamilySelect = document.getElementById('fontFamilySelect');

    fontFamilyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        fontFamilySelect.click();
    });

    fontFamilySelect.addEventListener('change', function () {
        var activeObject = canvas.getActiveObject();

        if (activeObject && activeObject.type === 'i-text') {
            var selectedFontFamily = fontFamilySelect.value;
            activeObject.set('fontFamily', selectedFontFamily);
            canvas.renderAll();
        }
    });

    // Font size controls
    var fontSizeInput = document.getElementById('fontSizeInput');

    document.getElementById('fontSizeDecrease').addEventListener('click', function () {
        updateFontSize(-1);
    });

    document.getElementById('fontSizeIncrease').addEventListener('click', function () {
        updateFontSize(1);
    });

    function updateFontSize(change) {
        var activeObject = canvas.getActiveObject();

        if (activeObject && activeObject.type === 'i-text') {
            var currentFontSize = activeObject.get('fontSize');
            var newFontSize = Math.max(1, currentFontSize + change); // Ensure font size is not less than 1
            activeObject.set('fontSize', newFontSize);
            canvas.renderAll();
            fontSizeInput.value = newFontSize; // Update the input value
        }
    }

    fontSizeInput.addEventListener('change', function () {
        var activeObject = canvas.getActiveObject();

        if (activeObject && activeObject.type === 'i-text') {
            var newFontSize = parseInt(fontSizeInput.value, 10);
            activeObject.set('fontSize', newFontSize);
            canvas.renderAll();
        }
    });

    // Font Color picker functionality
    var fontColorBtn = document.getElementById('fontcolorBtn');
    var fontColorPicker = document.getElementById('fontcolorPicker');

    fontColorBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (selectedObject && selectedObject.type === 'i-text') {
            fontColorPicker.value = selectedObject.getFill() || '#000000';
        }
        fontColorPicker.click();
    });

    fontColorPicker.addEventListener('input', function (e) {
        var color = e.target.value;
        var activeObject = canvas.getActiveObject();

        // Check if there is an active object and it's a text object
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.set('fill', color);
            canvas.renderAll();
        }
    });

    document.getElementById('boldBtn').addEventListener('click', function () {
    toggleTextStyle('fontWeight');
    });

    document.getElementById('italicBtn').addEventListener('click', function () {
    toggleTextStyle('fontStyle');
    });

    document.getElementById('underlineBtn').addEventListener('click', function () {
    toggleTextStyle('underline');
    });

    document.getElementById('strikethroughBtn').addEventListener('click', function () {
    toggleTextStyle('linethrough');
    });

    function toggleTextStyle(styleProp) {
    var activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === 'i-text') {
        if (styleProp === 'fontStyle' && activeObject.getFontStyle() === 'italic') {
            activeObject.setFontStyle('normal');  // Toggle off italic
        } else {
            // Toggle other styles
            var style = activeObject.get(styleProp) || '';
            activeObject.set(styleProp, style ? '' : styleProp === 'fontWeight' ? 'bold' : 'italic');
        }

        canvas.renderAll();
    }
}
    canvas.on('mouse:down', function (options) {
        var evt = options.e;
        var pointer = canvas.getPointer(options.e);

        // Check if the mouse is in the bottom-right corner
        if (
            pointer.x > canvas.width - 10 &&
            pointer.y > canvas.height - 10
        ) {
            isResizing = true;
            origX = pointer.x;
            origY = pointer.y;
            initialWidth = canvas.width;
            initialHeight = canvas.height;
        }
    });

    canvas.on('mouse:move', function (options) {
        if (isResizing) {
            var pointer = canvas.getPointer(options.e);
            var newWidth = initialWidth + (pointer.x - origX);
            var newHeight = initialHeight + (pointer.y - origY);

            // Set minimum width and height
            newWidth = Math.max(newWidth, 200);
            newHeight = Math.max(newHeight, 200);

            canvas.setDimensions({ width: newWidth, height: newHeight });
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function () {
        isResizing = false;
    });

    var selectedObject; // Keep track of the selected object for color change
    var clipboard;
    var undoStack = [];
    var redoStack = [];

    document.getElementById('addText').addEventListener('click', function () {
        var text = new fabric.IText('Type here', {
            left: 100,
            top: 100,
            fontFamily: 'Arial',
            fontSize: 20,
            fill: '#000000'
        });
        canvas.add(text);
        canvas.bringToFront(text);
    });

    document.getElementById('uploadImageBtn').addEventListener('click', function () {
        document.getElementById('uploadImage').click();
    });

    document.getElementById('uploadImage').addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var img = new Image();
                img.onload = function () {
                    var fabricImg = new fabric.Image(img, {
                        left: 100,
                        top: 100,
                        scaleX: 0.5,
                        scaleY: 0.5
                    });
                    canvas.add(fabricImg);
                    canvas.bringToFront(fabricImg);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('addRect').addEventListener('click', function () {
        var rect = new fabric.Rect({
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            fill: '#26547c'
        });
        canvas.add(rect);
        canvas.bringToFront(rect);
    });

    document.getElementById('addCircle').addEventListener('click', function () {
        var circle = new fabric.Circle({
            left: 100,
            top: 100,
            radius: 50,
            fill: '#ef476f'
        });
        canvas.add(circle);
        canvas.bringToFront(circle);
    });


        // Button click event listener
    var addTriangleButton = document.getElementById('addtriangle');
    addTriangleButton.addEventListener('click', function () {
        addTriangleToCanvas();
    });

    function addTriangleToCanvas() {
        var triangle = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: '#ffd166', // Set your desired fill color
            left: 100,
            top: 100,
        });

        canvas.add(triangle);
        canvas.renderAll();
    }


    document.getElementById('colorpickericon').addEventListener('click', function (e) {
        e.stopPropagation(); // Stop the click event from propagating
        if (selectedObject) {
            document.getElementById('colorPicker').value = selectedObject.getFill() || '#000000';
        }
        document.getElementById('colorPicker').click();
    });

    document.getElementById('colorPicker').addEventListener('input', function (e) {
    var color = e.target.value;
    var activeObject = canvas.getActiveObject();

    // Check if there is an active object and it's a shape
    if (activeObject && (activeObject instanceof fabric.Rect || activeObject instanceof fabric.Circle || activeObject instanceof fabric.Triangle || activeObject instanceof fabric.Polygon || activeObject instanceof fabric.Path)) {
        activeObject.set('fill', color);
    } else {
        // If no shape is selected, set the canvas background color
        canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    }
    canvas.renderAll();
});

    document.getElementById('download').addEventListener('click', function () {
        var dataUrl = canvas.toDataURL({ format: 'png' });
        var link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'design.png';
        link.click();
    });

    document.addEventListener('keydown', function (e) {
        // Copy (Ctrl+C)
        if (e.ctrlKey && e.key === 'c') {
            copyObjects();
        }

        // Paste (Ctrl+V)
        if (e.ctrlKey && e.key === 'v') {
            pasteObjects();
        }

        // Delete (Delete key)
        if (e.key === 'Delete' || e.key === 'Backspace') {
            deleteObjects();
        }

        document.getElementById('undo').addEventListener('click', function () {
        undo();
    });

    document.getElementById('redo').addEventListener('click', function () {
        redo();
    });

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'z') {
            undo();
        } else if (e.ctrlKey && e.key === 'y') {
            redo();
        }
    });

    function copyObjects() {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().clone(function (cloned) {
                clipboard = cloned;
            });
        }
    }

    function pasteObjects() {
        if (clipboard) {
            clipboard.clone(function (clonedObj) {
                canvas.discardActiveObject();
                clonedObj.set({
                    left: clonedObj.left + 10,
                    top: clonedObj.top + 10,
                    evented: true,
                });
                if (clonedObj.type === 'activeSelection') {
                    // active selection needs a reference to the canvas.
                    clonedObj.canvas = canvas;
                    clonedObj.forEachObject(function (obj) {
                        canvas.add(obj);
                    });
                    clonedObj.setCoords();
                } else {
                    canvas.add(clonedObj);
                }
                clipboard.top += 10;
                clipboard.left += 10;
                canvas.setActiveObject(clonedObj);
                canvas.requestRenderAll();
            });
        }
    }

    function deleteObjects() {
        var activeObjects = canvas.getActiveObjects();
        if (activeObjects && activeObjects.length > 0) {
            activeObjects.forEach(function (object) {
                canvas.remove(object);
            });
        }
    }
    function addToUndoStack() {
        var json = JSON.stringify(canvas.toDatalessJSON(['selectable', 'evented', 'lockScalingFlip']));
        undoStack.push(json);
    }

    function undo() {
        if (undoStack.length > 0) {
            var jsonData = undoStack.pop();
            redoStack.push(JSON.stringify(canvas));
            canvas.loadFromJSON(jsonData, function () {
                canvas.renderAll();
            });
        }
    }

    function redo() {
        if (redoStack.length > 0) {
            var jsonData = redoStack.pop();
            undoStack.push(JSON.stringify(canvas));
            canvas.loadFromJSON(jsonData, function () {
                canvas.renderAll();
            });
        }
    }

    // Register a callback on canvas object modification to update the undo stack
    canvas.on('object:modified', function () {
        addToUndoStack();
    });
});
    // Function to update the layer list
    function updateLayerList() {
        var layerList = document.getElementById('layerList');
        layerList.innerHTML = ''; // Clear existing items

        // Get objects in reverse order to have the newest on top
        var objects = canvas.getObjects().slice().reverse();

        objects.forEach(function (object, index) {
            var listItem = document.createElement('li');
            listItem.classList.add('layerItem');
            listItem.innerHTML = `
                <span>${object.type}</span>
                <span class="layerOrder">${index + 1}</span>
            `;

            // Add drag-and-drop functionality
            listItem.draggable = true;

            listItem.addEventListener('dragstart', function (e) {
                e.dataTransfer.setData('text/plain', index);
            });

            listItem.addEventListener('dragover', function (e) {
                e.preventDefault();
            });

            listItem.addEventListener('drop', function (e) {
                e.preventDefault();
                var fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
                var toIndex = index;

                // Move the objects in the canvas
                arrayMove(canvas.getObjects(), fromIndex, toIndex);

                // Update the layer list and render the canvas
                updateLayerList();
                canvas.renderAll();
            });

            layerList.appendChild(listItem);
        });
    }

    // Helper function to move an item in an array
    function arrayMove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }

    // Register a callback on canvas object modification to update the layer list
    canvas.on('object:modified', function () {
        updateLayerList();
    });

    // Initialize layer list
    updateLayerList();
});
   

