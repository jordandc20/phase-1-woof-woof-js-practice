// if have vars defined outside of functions will get an error because we are  running before rhe DOM has loaded so it does not have access to that data yet. thus have the vars inside the functions themselves since the top level function is inside the DOM event listener 

const run = () => {
    fetch('http://localhost:3000/pups')
        .then((resp) => resp.json())
        .then((data) => {
            const dogFilter = document.querySelector('#good-dog-filter')
            const dogBar = document.querySelector('#dog-bar')

            dogFilter.addEventListener('click', () => {
                if (dogFilter.innerText === 'Filter good dogs: OFF') {
                    dogFilter.innerText = 'Filter good dogs: ON'
                    dogBar.innerText = ''
                    const filteredPups = data.filter((pup) => {
                        if (pup.isGoodDog) {
                            return pup
                        }
                    })
                    filteredPups.forEach((pup) => {
                        addDogToNavBar(pup)
                    })
                } else {
                    dogFilter.innerText = 'Filter good dogs: OFF'
                    dogBar.innerText = ''

                    data.forEach((pup) => {
                        addDogToNavBar(pup)
                    })

                }

            })

            data.forEach((pup) => {
                addDogToNavBar(pup)
            })
        })
}

const addDogToNavBar = (pupObj) => {
    const dogBar = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')
    const dogSpan = document.createElement('span')

    dogSpan.innerText = pupObj.name
    dogBar.appendChild(dogSpan)

    dogSpan.addEventListener('click', () => {
        //  dogInfo.innerHTML = ''
        //other options include innerText and textContent - these work because you are DELETING so theres no need to differentiate the content inside. but if were selecting or adding text, there is active diff in how these behave
        dogInfo.innerText = ''
        //dogInfo.removeChild could also work but would have to either next the elements or create new vars to capture the elements so that the code has access 

        const dogImg = document.createElement('img')
        dogImg.src = pupObj.image

        const dogName = document.createElement('h2')
        dogName.innerText = pupObj.name

        const dogButton = document.createElement('button')
        dogButton.innerText = pupObj.isGoodDog ? "Good Dog!" : "Bad Dog!"
        dogButton.addEventListener('click', () => {
            if (dogButton.innerHTML === 'Good Dog!') {
                dogButton.innerHTML = 'Bad Dog!'
            } else {
                dogButton.innerText = 'Good Dog!'
            }

        })



        dogInfo.append(dogImg, dogName, dogButton)

    })
}





document.addEventListener('DOMContentLoaded', run)



