
function Loader() {
     
    return (
        <div className=" flex item-center justify-center w-full font-roboto">
            <div className=" flex items-center gap-x-3 text-green-800">
            <p className="   animate-pulse mt-4  "> Loading questions</p>
            <p className="   animate-bounce text-5xl  "> ...</p>
            </div>
        </div>
    )
}

export default Loader;