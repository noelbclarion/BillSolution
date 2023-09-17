import { useState } from 'react';
import {
    SafeAreaView, 
} from 'react-native';

import { Card, Button } from '@rneui/themed';
import { Input, Text } from "react-native-elements";

const Home = () => {

    const [previousReading, setPreviousReading] = useState(0);
    const [presentReading, setPresentReading] = useState(0);
    const [kilowattHourUsed, setKilowattHourUsed] = useState(0);
    const [totalMonthlyBill, setTotalMonthlyBill] = useState(0);

	const [kiloWattPerHour, setKiloWattPerHour] = useState(0);
    const [rateSum, setRateSum] = useState(0);
    const [totalBilling, setTotalBilling] = useState(0);
    const [excessBilling, setExcessBilling] = useState(0);

    const handlePress = () => {

        const kiloWattPerHour = parseFloat(totalMonthlyBill).toFixed(2) / parseFloat(kilowattHourUsed).toFixed(2);
        const rateSum =  parseFloat(presentReading).toFixed(2) - parseFloat(previousReading).toFixed(2);
        const totalBilling = parseFloat(rateSum).toFixed(2) * parseFloat(kiloWattPerHour).toFixed(2);
        const excessBilling = parseFloat(totalMonthlyBill).toFixed(2) - parseFloat(totalBilling).toFixed(2);

		setKiloWattPerHour(kiloWattPerHour);
		setRateSum(rateSum);
		setTotalBilling(totalBilling);
		setExcessBilling(excessBilling);

    };

    return (
        <SafeAreaView className="mt-10">
			<Card style={{borderRadius: 3}}> 
				<Text className="font-bold mt-3 pl-2">Previous Reading:</Text>
				<Input
					style={{ width: "100%" }}
					placeholder="Enter Previous Reading Here"
					onChangeText={newText => setPreviousReading(newText)}
					defaultValue={previousReading.toString()}
				/>
				<Text className="font-bold mt-3 pl-2">Present Reading:</Text>
				<Input
					placeholder="Enter Present Reading Here"
					onChangeText={newText => setPresentReading(newText)}
					defaultValue={presentReading.toString()}
				/>
				<Text className="font-bold mt-3 pl-2">KWhr used:</Text>
				<Input
					placeholder="Enter Kilo Watt/Hour"
					onChangeText={newText => setKilowattHourUsed(newText)}
					defaultValue={kilowattHourUsed.toString()}
				/>
				<Text className="font-bold mt-3 pl-2">Total Monthly Bill:</Text>
				<Input
					placeholder="Enter Total Monthly Bill"
					onChangeText={newText => setTotalMonthlyBill(newText)}
					defaultValue={totalMonthlyBill.toString()}
				/>
				<Button onPress={handlePress} className="mt-3 pl-2">
					<Text className="font-bold text-white">Get Result</Text>
				</Button>
			</Card>
			<Card>
				<Text className="font-bold mt-3 pl-2">kiloWatt Per Hour: {kiloWattPerHour}</Text>
				<Text className="font-bold mt-3 pl-2">Sum Rate: {rateSum}</Text>
				<Text className="font-bold mt-3 pl-2">Your Total Bill: {totalBilling}</Text>
				<Text className="font-bold mt-3 pl-2">Excess Bill: {excessBilling}</Text>
			</Card>
        </SafeAreaView>
    )
}

export default Home;