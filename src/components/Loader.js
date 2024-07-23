
function Loader() {
     
    return (
        <div className=" flex item-center justify-center w-full mt-52 font-roboto">
            <div className=" flex items-center gap-x-3 text-blue-200 text-3xl">
            <p className="   animate-pulse mt-4  "> Loading questions</p>
            <p className="   animate-bounce text-5xl  "> ...</p>
            </div>
        </div>
    )
}

export default Loader;