// Assets
import SearchBar from "../components/SearchBar/SearchBar";




function homepage() {
    const backgroundimage1 = "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

    return (
        <div className="bg-rowdy-blue w-full backdrop-brightness-50 h-screen flex bg-rowdy-blue bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${backgroundimage1})` }} >
            <div className="absolute w-full h-full">
                <h1 className="md:text-4xl lg:text-9xl xl:text-7xl font-sans mt-20 text-center text-white mb-9">Enter Your <em className="xl:text-9xl text-rowdy-blue underline">major</em>  to get started</h1>
                <div className=" flex justify-center mt-px" >
                    <SearchBar />
                </div>
                <div className=" flex justify-center" >
                    <h1 className="text-9xl text-white">-or-</h1>
                </div>
                <div className=" flex justify-center" >

                </div>
            </div>
        </div>
    );
}



export default homepage;