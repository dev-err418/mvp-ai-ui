import { Text, View, Picker, TextInput, TouchableOpacity } from "react-native";
import { DATA } from "./data";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { SearchArea } from "./Chatbot"

export const Scope2 = () => {

    const navigation = useNavigation()

    const steps = ["Stationary Combustion", "Mobile Combustion", "Fugitive Emissions"];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [pickerOptions, setPickerOptions] = useState(DATA[steps[0]]);

    const [selectedValue, setSelectedValue] = useState();
    const [selectedIndex, setSelectedIndex] = useState();

    const [currentPath, setCurrentPath] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);

    const [chat, setChat] = useState([{
        "role": "system", "content":
            `You are an environmental assistant.
          You are respectfull and polite.
          Give simple explications.
    `}])

    const [graph, setGraph] = useState({
        "Stationary Combustion": [],
        "Mobile Combustion": [],
        "Fugitive Emissions": []
    })

    useEffect(() => {
        setSelectedValue(Object.keys(pickerOptions[0])[0])
        setSelectedIndex(0)
    }, [pickerOptions])

    useEffect(() => {
        setPickerOptions(DATA[steps[currentIndex]])
    }, [currentIndex])

    useEffect(() => {
        console.log(graph)
    }, [graph])


    return (
        <View style={{
            padding: 20,
            width: "100vw",
            height: "100vh",
            backgroundColor: "white"
        }}>
            {
                showModal && <Modal
                    steps={steps}

                    currentIndex={currentIndex}

                    setShowModal={setShowModal}

                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}

                    graph={graph}
                    setGraph={setGraph}

                    currentPath={currentPath}
                    setCurrentPath={setCurrentPath}

                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}

                    pickerOptions={pickerOptions}
                    setPickerOptions={setPickerOptions}

                    showInput={showInput}
                    setShowInput={setShowInput}

                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            }
            {
                showChatbot && <View style={{ position: "absolute", top: 0, left: "50vw" }}>
                    <SearchArea chat={chat} setChat={setChat} setShow={setShowChatbot} />
                </View>
            }
            {
                showChatbot && <TouchableOpacity onPress={() => setShowChatbot(false)}
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 30,
                        backgroundColor: "green",
                        borderRadius: 10,
                        padding: 10,
                        zIndex: 10
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: "white" }}>Close</Text>
                </TouchableOpacity>
            }
            {!showChatbot && <>
                <TouchableOpacity onPress={() => setShowChatbot(true)}
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 30,
                        backgroundColor: "green",
                        borderRadius: 10,
                        padding: 10,
                        zIndex: 10
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: "white" }}>Looking for help ?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (currentIndex < 2) {
                            setCurrentIndex(currentIndex + 1)
                        } else {
                            // navigate to graphs page
                            navigation.navigate("Graphs", { data: graph })
                        }
                    }}
                    style={{
                        position: "absolute",
                        bottom: 20,
                        right: 30,
                        backgroundColor: "green",
                        borderRadius: 10,
                        padding: 10,
                        zIndex: 10
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: "white" }}>{currentIndex < 2 ? "Go to " + String(steps[currentIndex + 1]).toLowerCase() : "Show graphs"}</Text>
                </TouchableOpacity>
            </>
            }
            <View style={{ flexDirection: "row" }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: "bold"
                }}>My emissions <Text style={{ color: "darkgray", fontWeight: "400", fontSize: 20 }}>(Scope 1-2)</Text></Text>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: "green",
                        marginLeft: 10,
                    }}
                    onPress={() => setShowModal(true)}
                >
                    <Text style={{ color: "white", fontWeight: "bold " }}>Add {steps[currentIndex]}</Text>
                </TouchableOpacity>
            </View>
            <View>
                {
                    graph[steps[0]].length > 0 && (
                        <>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                marginTop: 20,
                                marginBottom: 10
                            }}>{steps[0]}</Text>
                            <View style={{ flexDirection: "row" }}>
                                {
                                    graph[steps[0]].map((obj, i) => {
                                        const key = Object.keys(obj)[0]
                                        const val = Object.values(obj)[0]
                                        return (
                                            <View key={i} style={{
                                                marginLeft: i != 0 ? 10 : 0,
                                                padding: 8,
                                                borderRadius: 10,
                                                shadowColor: "black",
                                                shadowOpacity: 0.5,
                                                shadowRadius: 4,
                                                alignItems: "center"
                                            }}>
                                                <Text style={{ fontWeight: "bold" }}>{key}</Text>
                                                <Text>{Number(val).toFixed(2)}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </>
                    )
                }
                {
                    graph[steps[1]].length > 0 && (
                        <>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                marginTop: 20,
                                marginBottom: 10
                            }}>{steps[1]}</Text>
                            <View style={{ flexDirection: "row" }}>
                                {
                                    graph[steps[1]].map((obj, i) => {
                                        const key = Object.keys(obj)[0]
                                        const val = Object.values(obj)[0]
                                        return (
                                            <View key={i} style={{
                                                marginLeft: i != 0 ? 10 : 0,
                                                padding: 8,
                                                borderRadius: 10,
                                                shadowColor: "black",
                                                shadowOpacity: 0.5,
                                                shadowRadius: 4,
                                                alignItems: "center"
                                            }}>
                                                <Text style={{ fontWeight: "bold" }}>{key}</Text>
                                                <Text>{Number(val).toFixed(2)}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </>
                    )
                }
                {
                    graph[steps[2]].length > 0 && (
                        <>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                marginTop: 20,
                                marginBottom: 10
                            }}>{steps[2]}</Text>
                            <View style={{ flexDirection: "row" }}>
                                {
                                    graph[steps[2]].map((obj, i) => {
                                        const key = Object.keys(obj)[0]
                                        const val = Object.values(obj)[0]
                                        return (
                                            <View key={i} style={{
                                                marginLeft: i != 0 ? 10 : 0,
                                                padding: 8,
                                                borderRadius: 10,
                                                shadowColor: "black",
                                                shadowOpacity: 0.5,
                                                shadowRadius: 4,
                                                alignItems: "center"
                                            }}>
                                                <Text style={{ fontWeight: "bold" }}>{key}</Text>
                                                <Text>{Number(val).toFixed(2)}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </>
                    )
                }
            </View>
        </View>
    )
}

const Modal = ({
    steps,
    currentIndex,
    setShowModal,
    selectedIndex,
    setSelectedIndex,
    graph,
    setGraph,
    selectedValue,
    setSelectedValue,
    currentPath,
    setCurrentPath,
    pickerOptions,
    setPickerOptions,
    showInput,
    setShowInput,
    inputValue,
    setInputValue
}) => {
    return (
        <View style={{
            position: "absolute",
            zIndex: 1,
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: "white",
                zIndex: 2,
                minWidth: 400,
                shadowColor: "black",
                shadowOpacity: 0.5,
                shadowRadius: 7.5,
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 5 }}>{steps[currentIndex]}</Text>
                    <TouchableOpacity onPress={() => setShowModal(false)}>
                        <Text style={{ padding: 5, fontWeight: "700" }}>X</Text>
                    </TouchableOpacity>
                </View>
                <Picker
                    style={{
                        borderRadius: 5,
                        border: "none",
                        outline: "none",
                        padding: 4,
                        marginVertical: 15,
                        shadowColor: "black",
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        fontSize: 14,
                        fontWeight: "500"
                    }}
                    selectedValue={selectedValue}
                    onValueChange={(item, index) => {
                        setSelectedValue(item);
                        setSelectedIndex(index);
                    }}
                >
                    {
                        pickerOptions.map((option, i) => {
                            return (
                                <Picker.Item
                                    value={Object.keys(option)[0]}
                                    label={Object.values(option)[0]}
                                    key={i}
                                />
                            )
                        })
                    }
                </Picker>
                {
                    showInput &&
                    <TextInput
                        placeholder="Enter a number"
                        placeholderTextColor={"gray"}
                        style={{
                            borderRadius: 5,
                            border: "none",
                            outline: "none",
                            padding: 6,
                            marginBottom: 15,
                            shadowColor: "black",
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            fontSize: 14,
                            fontWeight: "500"
                        }}
                        value={inputValue}
                        onChangeText={(e) => {
                            if (/^\d*\.?\d*$/.test(e)) {
                                setInputValue(e)
                            }
                        }}
                    />
                }
                <TouchableOpacity

                    disabled={inputValue.length == 0 && showInput}

                    style={{
                        opacity: inputValue.length == 0 && showInput ? 0.5 : 1,
                        padding: 10,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "green",
                    }}

                    onPress={() => {
                        const isNextInput = () => {
                            if (Object.keys(DATA[selectedValue][0])[0] == "input") {
                                return true;
                            }

                            return false;
                        }


                        if (showInput) {
                            // last run before adding it                    
                            // add path to the graph
                            const coef = Object.values(DATA[selectedValue][0])[0];
                            const newArray = [...graph[steps[currentIndex]], { [currentPath]: Number(coef) * Number(inputValue) }];
                            setGraph({ ...graph, [steps[currentIndex]]: newArray });

                            // reset variables                 
                            setPickerOptions(DATA[steps[currentIndex]])
                            setShowModal(false)
                            setCurrentPath("")
                            setInputValue("")
                            return setShowInput(false)
                        } else {
                            if (currentPath.length) {
                                if (!isNaN(selectedValue)) {
                                    // check if the key is a number to put the value in the path (tonnes, kilo, etc...)
                                    setCurrentPath(currentPath + " - " + Object.values(pickerOptions[selectedIndex])[0])
                                } else {
                                    setCurrentPath(currentPath + " - " + selectedValue)
                                }
                            } else {
                                setCurrentPath(selectedValue)
                            }
                        }

                        if (isNextInput()) {
                            setShowInput(true)
                        } else {
                            setPickerOptions(DATA[selectedValue])
                        }
                    }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>{showInput ? "Add" : "Next"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}