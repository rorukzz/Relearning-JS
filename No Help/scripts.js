const countryHTML = document.getElementById('current-country')

async function getCountry() {
    const res = await fetch('https://get.geojs.io/v1/ip/geo.json')
    const data = await res.json()

    if (countryHTML) {
        const headerH1 = document.createElement('h1')
        const ipText = document.createElement('h2')
        const providerText = document.createElement('h2')

        headerH1.classList.add('location');
        ipText.classList.add('ip-address');
        providerText.classList.add('internet-provider');

        headerH1.textContent = `Location: ${data.city}, ${data.region}, ${data.country}`
        ipText.textContent = `IP Address: ${data.ip}`
        providerText.textContent = `Internet Provider: ${data.organization}`

        countryHTML.appendChild(headerH1)
        countryHTML.appendChild(ipText)
        countryHTML.appendChild(providerText)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getCountry();
})