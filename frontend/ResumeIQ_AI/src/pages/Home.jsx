import {Features} from "../component/Features";
import Hero from "../component/Hero";
import {Navbar1} from "../component/Navbar1";

 export function Home() {

    return (

        <>
            <Navbar1 />
            <Hero/>
            <Features/>

            <div
                style={{
                    minHeight: "100vh",
                    background: "#0e142e",
                }}
            >
            </div>

        </>

    );

}

export default Home;