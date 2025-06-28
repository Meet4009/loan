// Add custom alert styles and functions
    const style = document.createElement('style');
    style.textContent = `
        .custom-alert {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-10px);
            z-index: 1000;
            padding: 15px 20px;
            border-radius: 5px;
            min-width: 200px;
            max-width: 300px;
            color: white;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .custom-alert.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        .custom-alert.success {
            background-color: #28a745;
        }
        .custom-alert.error {
            background-color: #dc3545;
        }
        .custom-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 5px;
            z-index: 2000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 300px;
        }
        .custom-modal button {
            margin: 10px;
            padding: 8px 16px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            color: white;
        }
        .custom-modal .btn-yes {
            background: #dc3545;
        }
        .custom-modal .btn-no {
            background: #6c757d;
        }
    `;
    document.head.appendChild(style);

    const showAlert = (message, type = 'error') => {
        const alertDiv = document.createElement('div');
        alertDiv.className = `custom-alert ${type}`;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.classList.add('show'), 10);
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 300);
        }, 3000);
    };

    const showConfirm = (message, onYes, onNo) => {
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.innerHTML = `
            <div style="margin-bottom: 10px;">${message}</div>
            <button class="btn-yes">Yes</button>
            <button class="btn-no">No</button>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.btn-yes').onclick = () => {
            modal.remove();
            if (onYes) onYes();
        };
        modal.querySelector('.btn-no').onclick = () => {
            modal.remove();
            if (onNo) onNo();
        };
    };