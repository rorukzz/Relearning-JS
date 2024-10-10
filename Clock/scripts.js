function updateClock() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear()

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().padStart(2, '0')}`

    document.getElementById('time').textContent = formattedTime;
    document.getElementById('date').textContent = formattedDate;
}

setInterval(updateClock, 1000)


updateClock()