
function Error() {
     
    return (
        <div className=" flex item-center justify-center w-full  ">
            <div className="  w-80 flex items-center justify-center gap-x-3 border rounded-full shadow bg-gray-200 p-5  text-sm">
            <p className=" text-2xl"> 💥 </p>
            <p className="text-black text-lg  animate-pulse   "> Error Fetching from API</p>
            </div>
        </div>
    )
}

export default Error;