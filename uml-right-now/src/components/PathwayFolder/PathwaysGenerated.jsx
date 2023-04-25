import { Button, Card, Grid, Text } from "@nextui-org/react";
import { useState } from "react";
import PrintPathway from "../PdfFile/PrintForProfile";

export default function App({ propsArr, pathways }) {
    const [isOpen, setIsOpen] = useState(false);
    const [whichIndex, setwhichIndex] = useState(false);
    console.log(pathways);

    function handleClick(event) {
        console.log(event.target.value);
        setwhichIndex(event.target.value);
        setIsOpen(true);
    }

    return (
        <Grid.Container gap={2} justify="flex-start">
            {propsArr.map((arr, index) => {
                return (
                    <Grid xs={12} sm={3} key={index} >
                        <Card isHoverable isPressable variant="bordered" css={{ mw: "330px" }} >
                            <Card.Header className="text-center sm:text-sm lg:text-xl">
                                <Text className="text-base" b>{arr.major}</Text>

                            </Card.Header>
                            <Card.Divider />
                            <Card.Divider />
                            <Card.Footer>
                                <Button onClick={handleClick} value={index} size="sm" className="bg-rowdy-blue">
                                    See more details
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Grid>

                );
            })}

            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto pt-20 overscroll-none">
                    <div className="flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-75"></div>
                        <div className="relative w-auto lg:w-3/4  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all  sm:p-6">

                            <div className="absolute top-0 right-0 pt-4 pr-4">
                                <button className="text-gray-400 hover:text-gray-500" onClick={() => setIsOpen(false)}>
                                    <svg
                                        className="h-10 w-10"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <div className="mt-4 ">
                                    <PrintPathway isColumn major={pathways.at(whichIndex).major} degreePathway={pathways.at(whichIndex).pathway} />
                                </div>
                                <div className="absolute bottom-0 right-0 pt-4 pr-4">
                                    <button className="text-gray-400 hover:text-gray-500" onClick={() => setIsOpen(false)}>
                                        <svg
                                            className="h-10 w-10"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Grid.Container>
    );
}


















// export default function App({ propsArr }) {
//     // Contexts
//     const { setMajor } = useContext(TranscriptContext);
//     const router = useRouter();

//     // Helpers
//     const handleAutocompleteChanged = (event) => {
//         //setMajor(value);
//         setMajor(event.target.value);
//         console.log(event.target.value);
//         router.push("/pathways");
//     };

//     return (
//         <Grid.Container gap={2} justify="flex-start">
//             {propsArr.map((arr, index) => {
//                 return (
//                     <Grid xs={12} sm={3} key={index}>
//                         <Card isHoverable isPressable variant="bordered" css={{ mw: "330px" }} >
//                             <Card.Header className="text-center sm:text-sm lg:text-xl">
//                                 <Text b>{arr.major}</Text>

//                             </Card.Header>
//                             <Card.Divider />
//                             <Card.Divider />
//                             <Card.Footer>
//                                 <Tooltip content={"Howwdy!"} color="primary" placement="rightEnd">
//                                     <Button onClick={handleAutocompleteChanged} value={arr.major} size="sm" className="bg-rowdy-blue">
//                                         See more details
//                                     </Button>
//                                 </Tooltip>
//                             </Card.Footer>
//                         </Card>
//                     </Grid>

//                 );
//             })}
//         </Grid.Container>
//     );
// }













// export default function App({ propsArr }) {
//     // Contexts
//     const { setMajor } = useContext(TranscriptContext);
//     const router = useRouter();

//     // Helpers
//     const handleAutocompleteChanged = (event) => {
//         //setMajor(value);
//         setMajor(event.target.value);
//         console.log(event.target.value);
//         router.push("/pathways");
//     };

//     return (
//         <Grid.Container gap={2} justify="flex-start">
//             {propsArr.map((arr, index) => {
//                 return (
//                     <Grid xs={12} sm={3} key={index}>
//                         <Card isHoverable isPressable variant="bordered" css={{ mw: "330px" }} >
//                             <Card.Header className="text-center sm:text-sm lg:text-xl">
//                                 <Text b>{arr.major}</Text>

//                             </Card.Header>
//                             <Card.Divider />
//                             <Card.Divider />
//                             <Card.Footer>
//                                 <Tooltip content={"Howwdy!"} color="primary" placement="rightEnd">
//                                     <Button onClick={handleAutocompleteChanged} value={arr.major} size="sm" className="bg-rowdy-blue">
//                                         See more details
//                                     </Button>
//                                 </Tooltip>
//                             </Card.Footer>
//                         </Card>
//                     </Grid>

//                 );
//             })}
//         </Grid.Container>
//     );
// }
