/* 
 * Copyright 2018 michael.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



function Splitter(parent = null, prefix = "") {
    this.parent = parent || document.body;
    this.prefix = prefix || "";

    this.largeSize = 50;
    this.smallSize = 20;
    this.currentSize = this.smallSize;

    this.color = "#b0b0ff";

    this.handle = document.createElement("div");
    this.handle.splitter = this;
    this.handle.style.width = this.smallSize + "px";
    this.handle.style.height = this.smallSize + "px";
    this.handle.innerHTML = this.smallIcon();
    this.handle.isLarge = false;

    this.handle.style.position = "absolute";
    var width = this.parent.offsetWidth;
    var height = this.parent.offsetHeight;
    this.handle.style.left = "" + ((width - this.largeSize / 2) / 2) + "px";
    this.handle.style.top = "" + ((height - this.largeSize / 2) / 2) + "px";
    this.handle.style.cursor = "move";
    this.parent.appendChild(this.handle);

    this.handle.setAttribute("draggable", "true");

    this.handle.onmouseenter = this.onmouseenter;
    this.handle.onmouseleave = this.onmouseleave;
    this.handle.ondragstart = this.ondragstart;
    this.handle.ondrag = this.ondrag;
    this.handle.ondragend = this.ondragend;

    this.updateViews();
}
;



// The large splitter icon
Splitter.prototype.largeIcon = function () {
    return "<svg>" +
            "<circle cx='25' cy='25' r='17' fill='white' stroke='" + this.color + "' stroke-width='2px'/>" +
            "<circle cx='25' cy='25' r='7' fill='" + this.color + "' stroke='" + this.color + "' stroke-width='2px'/>" +
            "</svg>";
};

// The small splitter icon
Splitter.prototype.smallIcon = function () {
    return "<svg>" +
            "<circle cx='10' cy='10' r='7' fill='" + this.color + "' stroke='" + this.color + "' stroke-width='2px'/>" +
            "</svg>";
};






Splitter.prototype.updateViews = function () {
    var posX = this.handle.offsetLeft;
    var posY = this.handle.offsetTop;

    // Resize top left
    var topleft = document.getElementById(this.prefix + ".topleft");
    if (topleft != null) {
        topleft.style.position = "absolute";
        topleft.style.top = "0px";
        topleft.style.left = "0px";
        topleft.style.width = (this.handle.offsetLeft + this.currentSize / 2) + "px";
        topleft.style.height = (this.handle.offsetTop + this.currentSize / 2) + "px";
    }

    // Resize top right
    var topright = document.getElementById(this.prefix + ".topright");
    if (topright != null) {
        topright.style.position = "absolute";
        topright.style.top = "0px";
        topright.style.left = (this.handle.offsetLeft + this.currentSize / 2) + "px";
        topright.style.right = "0px";
        topright.style.height = (this.handle.offsetTop + this.currentSize / 2) + "px";
    }

    // Resize bottom left
    var bottomleft = document.getElementById(this.prefix + ".bottomleft");
    if (bottomleft != null) {
        bottomleft.style.position = "absolute";
        bottomleft.style.top = (this.handle.offsetTop + this.currentSize / 2) + "px";
        bottomleft.style.left = "0px";
        bottomleft.style.width = (this.handle.offsetLeft + this.currentSize / 2) + "px";
        bottomleft.style.bottom = "0px";
    }

    // Resize bottom right
    var bottomright = document.getElementById(this.prefix + ".bottomright");
    if (bottomright != null) {
        bottomright.style.position = "absolute";
        bottomright.style.top = (this.handle.offsetTop + this.currentSize / 2) + "px";
        bottomright.style.left = (this.handle.offsetLeft + this.currentSize / 2) + "px";
        bottomright.style.right = "0px";
        bottomright.style.bottom = "0px";
    }

    // Resize left
    var left = document.getElementById(this.prefix + ".left");
    if (left != null) {
        left.style.position = "absolute";
        left.style.top = "0px";
        left.style.left = "0px";
        left.style.width = (this.handle.offsetLeft + this.currentSize / 2) + "px";
        left.style.bottom = "0px";
    }

    // Resize right
    var right = document.getElementById(this.prefix + ".right");
    if (right != null) {
        right.style.position = "absolute";
        right.style.top = "0px";
        right.style.left = (this.handle.offsetLeft + this.currentSize / 2) + "px";
        right.style.right = "0px";
        right.style.bottom = "0px";
    }

    // Resize top
    var top = document.getElementById(this.prefix + ".top");
    if (top != null) {
        top.style.position = "absolute";
        top.style.top = "0px";
        top.style.left = "0px";
        top.style.right = "0px";
        top.style.height = (this.handle.offsetTop + this.currentSize / 2) + "px";
    }

    // Resize bottom
    var bottom = document.getElementById(this.prefix + ".bottom");
    if (bottom != null) {
        bottom.style.position = "absolute";
        bottom.style.bottom = "0px";
        bottom.style.left = "0px";
        bottom.style.right = "0px";
        bottom.style.top = (this.handle.offsetTop + this.currentSize / 2) + "px";
    }

}

// Grow splitter icon
Splitter.prototype.grow = function () {
    if (this.handle.isLarge == false) {
        this.handle.style.width = this.largeSize + "px";
        this.handle.style.height = this.largeSize + "px";
        this.handle.innerHTML = this.largeIcon();
        this.handle.style.top = (this.handle.offsetTop - (this.largeSize - this.smallSize) / 2) + "px";
        this.handle.style.left = (this.handle.offsetLeft - (this.largeSize - this.smallSize) / 2) + "px";
        this.handle.isLarge = true;
        this.currentSize = this.largeSize;
    }
}

// Shrink splitter icon
Splitter.prototype.shrink = function () {
    if (this.handle.isLarge == true) {
        this.handle.style.width = this.smallSize + "px";
        this.handle.style.height = this.smallSize + "px";
        this.handle.innerHTML = this.smallIcon();
        this.handle.style.top = (this.handle.offsetTop + (this.largeSize - this.smallSize) / 2) + "px";
        this.handle.style.left = (this.handle.offsetLeft + (this.largeSize - this.smallSize) / 2) + "px";
        this.handle.isLarge = false;
        this.currentSize = this.smallSize;
    }
}


Splitter.prototype.onmouseenter = function (event) {
    this.splitter.grow();
}

Splitter.prototype.onmouseleave = function (event) {
    this.splitter.shrink();
}

Splitter.prototype.ondragstart = function (event) {
    event = event || window.event;
    oldX = event.clientX;
    oldY = event.clientY;
}

Splitter.prototype.ondrag = function (event) {
    event = event || window.event;
    newX = this.offsetLeft + event.offsetX;
    newY = this.offsetTop + event.offsetY;
    oldX = event.clientX;
    oldY = event.clientY;

    var parent = this.splitter.parent;
    if ( newY < -this.splitter.currentSize/2 ) {
        newY = -this.splitter.currentSize/2;
    }
    if ( newY > parent.offsetHeight - this.splitter.currentSize/2 ) {
        newY = parent.offsetHeight - this.splitter.currentSize/2;
    }
    if ( newX < -this.splitter.currentSize/2 ) {
        newX = -this.splitter.currentSize/2;
    }
    if ( newX > parent.offsetWidth - this.splitter.currentSize/2 ) {
        newX = parent.offsetWidth - this.splitter.currentSize/2;
    }
    
    this.style.top = (newY) + "px";
    this.style.left = (newX) + "px";
    this.splitter.updateViews();
}

Splitter.prototype.ondragend = function (event) {
    event = event || window.event;
    newX = this.offsetLeft + event.offsetX;
    newY = this.offsetTop + event.offsetY;
    
    var parent = this.splitter.parent;
    if ( newY < -this.splitter.currentSize/2 ) {
        newY = -this.splitter.currentSize/2;
    }
    if ( newY > parent.offsetHeight - this.splitter.currentSize/2 ) {
        newY = parent.offsetHeight - this.splitter.currentSize/2;
    }
    if ( newX < -this.splitter.currentSize/2 ) {
        newX = -this.splitter.currentSize/2;
    }
    if ( newX > parent.offsetWidth - this.splitter.currentSize/2 ) {
        newX = parent.offsetWidth - this.splitter.currentSize/2;
    }
    
    this.style.top = (newY) + "px";
    this.style.left = (newX) + "px";
    this.splitter.updateViews();
    
}