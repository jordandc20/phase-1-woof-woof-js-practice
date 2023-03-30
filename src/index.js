

document.addEventListener('DOMContentLoaded', () => {

    const dogBar = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')

    fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(data => addPups(data))


    //append each dog to the bar as <span>
    function addPups(pups) {
        pups.forEach(pup => {
            const pupSpan = document.createElement('span')
            pupSpan.innerText = pup.name
            pupSpan.dataset.id = pup.id

            pupSpan.addEventListener('click', pupClick)

            dogBar.appendChild(pupSpan)

            function pupClick(e) {

                dogInfo.innerText = ''

                const pupName = document.createElement('h2')
                pupName.innerText = pup.name

                const pupImg = document.createElement('img')
                pupImg.src = pup.image

                const pupBtn = document.createElement('button')
                pup.isGoodDog ? pupBtn.innerText = "Good Dog!" : pupBtn.innerText = "Bad Dog!"
                pupBtn.addEventListener('click', () => {
                    if (pupBtn.innerText === "Good Dog!") {
                        pupBtn.innerText = "Bad Dog!"
                    } else {
                        pupBtn.innerText = "Good Dog!"
                    }
                })
                pupImg.src = pup.image
                dogInfo.append(pupName, pupImg, pupBtn)
            }
        })
    }
});
