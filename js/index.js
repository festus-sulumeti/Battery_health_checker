/*=============== BATTERY ===============*/
initBattery()

function initBattery(){
    const batteryLiquid = document.querySelector('.battery__liquid'),
          batteryStatus = document.querySelector('.battery__status'),
          batteryPercentage = document.querySelector('.battery__percentage')
    
    navigator.getBattery().then((batt) =>{
        updateBattery = () =>{
            /* 
             * 1. Update the battery level percentage displayed 
             */
            let level = Math.floor(batt.level * 100)
            batteryPercentage.innerHTML = level + '%'

            /* 
             * 2. Update the battery liquid height to reflect the current level 
             */
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

            /* 
             * 3. Display battery status messages based on the battery level and charging state 
             */
            if(level == 100){ 
                /* Battery is fully charged */
                batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`
                batteryLiquid.style.height = '103%' /* Slightly overflow to hide the ellipse */
                showNotification('Battery fully charged')
            }
            else if(level <= 20 && !batt.charging){ 
                /* Battery is low and not charging */
                batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`
                showNotification('Low battery')
            }
            else if(batt.charging){ 
                /* Battery is currently charging */
                batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`
            }
            else{ 
                /* Battery is neither low nor charging */
                batteryStatus.innerHTML = ''
            }
            
            /* 
             * 4. Change the battery liquid color based on the battery level 
             */
            if(level <= 20){
                batteryLiquid.classList.add('gradient-color-red')
                batteryLiquid.classList.remove('gradient-color-orange','gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 40){
                batteryLiquid.classList.add('gradient-color-orange')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 80){
                batteryLiquid.classList.add('gradient-color-yellow')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-green')
            }
            else{
                batteryLiquid.classList.add('gradient-color-green')
                batteryLiquid.classList.remove('gradient-color-red','gradient-color-orange','gradient-color-yellow')
            }
        }
        updateBattery()

        /* 
         * 5. Add event listeners to update the battery status when it changes 
         */
        batt.addEventListener('chargingchange', () => {updateBattery()})
        batt.addEventListener('levelchange', () => {updateBattery()})
    })
}

/*=============== NOTIFICATIONS ===============*/
function showNotification(message) {
    if (Notification.permission === 'granted') {
        new Notification(message)
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(message)
            }
        })
    }
}

navigator.getBattery().then((batt) => {
    batt.addEventListener('levelchange', () => {
        if (batt.level * 100 <= 20 && !batt.charging) {
            showNotification('Low battery')
        } else if (batt.level * 100 == 100) {
            showNotification('Battery fully charged')
        }
    })
})