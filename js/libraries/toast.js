//  guess what? it's made by me, aqualxx :)
(function() {
    'use strict';
    var toast = {
        success: function(msg) {
            placeToast(msg, 'success');
        },
        info: function(msg) {
            placeToast(msg, 'info');
        },
        warning: function(msg) {
            placeToast(msg, 'warning');
        },
        error: function(msg) {
            placeToast(msg, 'error');
        }
    }
    var classes = {
        container: 'toast-container',
        default: 'toast show',
        success: 'toast-success',
        info: 'toast-info',
        warning: 'toast-warn',
        error: 'toast-error'
    };
    function placeToast(msg, type) {
        var toastContainer = document.getElementsByClassName(classes.container)[0];
        var containerExists = !!toastContainer;
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = classes.container;
        }
        var newToast = document.createElement("div");
        var newToastExists = true;
        newToast.className = classes.default+' '+classes[type]
        newToast.innerHTML = msg
        newToast.onclick = function() {
            newToastExists = false
            this.parentNode.removeChild(this)
        }
        newToast.style.cursor = "pointer"
        if (!containerExists) {
            document.body.insertBefore(toastContainer, document.body.childNodes[0]);
        }
        toastContainer.insertBefore(newToast, toastContainer.childNodes[0]);
        setTimeout(function(){
            toastContainer.className = toastContainer.className.replace("show", "")
            if (newToastExists) newToast.parentNode.removeChild(newToast);
            var numToasts = document.getElementsByClassName(classes.container)[0].childNodes.length;
            if (!numToasts) {
                toastContainer.parentNode.removeChild(toastContainer);
            }
        }, 5000); //* make sure to change last param in toast.css, .toast.show when changing toast settimeout time
    }
    window.toast = toast
})();