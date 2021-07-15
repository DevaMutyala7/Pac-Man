const scoreDisplay = document.getElementById("score")
const grid = document.getElementById("grid")
const msg = document.getElementById("msg")
const msg2 = document.getElementById("msg2")
const btn = document.getElementById("Reset")
const btn2 = document.getElementById("Reset2")
const square=[]
let PacmanstartIndex = 490;
let score = 0
let timerId

const squares = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]


// 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

function Layout(){
    for(let i=0;i<squares.length;i++)
    {
        let divs = document.createElement("div")
        grid.appendChild(divs)
        square.push(divs)
        if(squares[i]===1) square[i].classList.add("wall")
        else if(squares[i]===0) square[i].classList.add("pac-dots")
        else if(squares[i]===3) square[i].classList.add("power-pellet")
        else if(squares[i]===2) square[i].classList.add("ghost-liar")
    }
}

Layout()

square[PacmanstartIndex].classList.add("pac-man")

function movePacman(e){
        square[PacmanstartIndex].classList.remove("pac-man")
        switch(e.keyCode)
        {
            case 38: 
                //console.log("key up")
                direction = -28;
                if(PacmanstartIndex - 28 >= 0 && !square[PacmanstartIndex - 28].classList.contains("wall") &&
                !square[PacmanstartIndex - 28].classList.contains("ghost-liar"))
                {
                    PacmanstartIndex-=28
                }
                break
            case 39: 
                //console.log("right")
                direction = +1
                if(PacmanstartIndex % 28 !== 27 && !square[PacmanstartIndex + 1].classList.contains("wall") &&
                !square[PacmanstartIndex + 1].classList.contains("ghost-liar"))
                {
                    PacmanstartIndex+=1
                }
                break
            case 40: 
                //console.log("down")
                if(PacmanstartIndex + 28 < 784 && !square[PacmanstartIndex + 28].classList.contains("wall") && 
                !square[PacmanstartIndex + 28].classList.contains("ghost-liar"))
                {
                    PacmanstartIndex+=28
                }
                break
            case 37: 
                //console.log("left")
                if(PacmanstartIndex % 28 !==0 && !square[PacmanstartIndex - 1].classList.contains("wall") &&
                !square[PacmanstartIndex - 1].classList.contains("ghost-liar")){
                    PacmanstartIndex -= 1
                } 
                break
        }
        square[PacmanstartIndex].classList.add("pac-man")
        pacDotEat()
        PelletEat()
}

document.addEventListener("keyup",movePacman)

function pacDotEat()
{
    if(square[PacmanstartIndex].classList.contains("pac-dots"))
    {
        square[PacmanstartIndex].classList.remove("pac-dots")
        score++
    }
    if(score == 274)
    {
        msg.style.display="flex"
        document.removeEventListener("keyup",movePacman)
        ghosts.forEach(ghost=>{
            clearInterval(ghost.timerId)
        })
    }
}

function PelletEat()
{
    if(square[PacmanstartIndex].classList.contains("power-pellet"))
    {
        square[PacmanstartIndex].classList.remove("power-pellet")
        score+=10

        ghosts.forEach(ghost=>{
            ghost.isScared = true
        })

        setTimeout(unScareghost,10000)
    }
}

function unScareghost()
{
    ghosts.forEach(ghost=>{
        ghost.isScared = false
    })
}

btn.addEventListener("click",resetit)
btn2.addEventListener("click", resetit)

function resetit()
{
        msg.style.display="none";
        msg2.style.display="none";
        square[PacmanstartIndex].classList.remove("pac-man")
        PacmanstartIndex = 490;
        square[PacmanstartIndex].classList.add("pac-man")
        score=0;
        for(let i=0;i<squares.length;i++)
        {
            if(squares[i]===0) square[i].classList.add("pac-dots")
            else if(squares[i]===3) square[i].classList.add("power-pellet")
        }
        ghosts.forEach(ghost=>{
            square[ghost.statrIndex].classList.remove(ghost.className)
            square[ghost.statrIndex].classList.remove("ghost","scared-ghost")
            ghost.statrIndex = ghost.initiate
        })
        moveGhosts()
        document.addEventListener("keyup",movePacman)
}

class Ghost{
    constructor(className,statrIndex,speed)
    {
        this.initiate = statrIndex
        this.className = className
        this.statrIndex = statrIndex
        this.isScared = false
        this.speed = speed
        this.timerId = 0
    }
}

ghosts = [new Ghost("Inky",348,200), new Ghost("Pinky",376,300), new Ghost("Blinky",351,400),new Ghost("Chinky",379,250)]


ghosts.forEach(ghost => {
    square[ghost.statrIndex].classList.add(ghost.className)
    square[ghost.statrIndex].classList.add("ghost")
});


function moveGhosts()
{
   
    const direction = [1, -1, 28, -28]
    let move = direction[Math.floor(Math.random() * direction.length)]
    ghosts.forEach(ghost=>{
        ghost.timerId = setInterval(()=>{
            if(!square[ghost.statrIndex + move].classList.contains("wall") &&
            !square[ghost.statrIndex + move].classList.contains("ghost"))
            {
                square[ghost.statrIndex].classList.remove(ghost.className)
                square[ghost.statrIndex].classList.remove("ghost","scared-ghost")

                ghost.statrIndex+= move
    
                square[ghost.statrIndex].classList.add(ghost.className)
                square[ghost.statrIndex].classList.add("ghost")
            }
            else
            {
                move = direction[Math.floor(Math.random() * direction.length)]
            }


            if(ghost.isScared)
            {
                square[ghost.statrIndex].classList.add("scared-ghost")
            }

            if(ghost.isScared && square[ghost.statrIndex].classList.contains("pac-man"))
            {
                score+=10

                square[ghost.statrIndex].classList.remove(ghost.className,"scared-ghost", "ghost")
    
                ghost.statrIndex = ghost.initiate
    
                square[ghost.statrIndex].classList.add(ghost.className, "ghost")

            }
            GameOver()
        },ghost.speed)

    })

}


function GameOver()
{
    if(!square[PacmanstartIndex].classList.contains("scared-ghost") &&square[PacmanstartIndex].classList.contains("ghost"))
    {
            msg2.style.display="flex"
            document.removeEventListener("keyup",movePacman)
            ghosts.forEach(ghost=>{
                clearInterval(ghost.timerId)
            })
    }
}

moveGhosts()




