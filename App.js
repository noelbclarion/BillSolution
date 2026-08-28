import { useState } from 'react';
import {
    SafeAreaView,
    View,
    ScrollView,
    Alert,
} from 'react-native';

import { Card, Button, Input, Text } from '@rneui/themed';

const Home = () => {
    const [previousReading, setPreviousReading] = useState('');
    const [presentReading, setPresentReading] = useState('');
    const [kilowattHourUsed, setKilowattHourUsed] = useState('');
    const [totalMonthlyBill, setTotalMonthlyBill] = useState('');

    const [kiloWattPerHour, setKiloWattPerHour] = useState(0);
    const [rateSum, setRateSum] = useState(0);
    const [totalBilling, setTotalBilling] = useState(0);
    const [excessBilling, setExcessBilling] = useState(0);

    const [hasCalculated, setHasCalculated] = useState(false);

    const handlePress = () => {
        const previous = parseFloat(previousReading);
        const present = parseFloat(presentReading);
        const used = parseFloat(kilowattHourUsed);
        const monthlyBill = parseFloat(totalMonthlyBill);

        if (
            isNaN(previous) ||
            isNaN(present) ||
            isNaN(used) ||
            isNaN(monthlyBill)
        ) {
            Alert.alert(
                'Missing Information',
                'Please enter all the required values before calculating.'
            );
            return;
        }

        if (used <= 0) {
            Alert.alert(
                'Invalid kWh',
                'Household total kWh used must be greater than zero.'
            );
            return;
        }

        if (present < previous) {
            Alert.alert(
                'Invalid Meter Reading',
                'Your present reading cannot be lower than your previous reading.'
            );
            return;
        }

        const rate = monthlyBill / used;
        const consumption = present - previous;
        const billing = consumption * rate;
        const excess = monthlyBill - billing;

        setKiloWattPerHour(rate);
        setRateSum(consumption);
        setTotalBilling(billing);
        setExcessBilling(excess);
        setHasCalculated(true);
    };

    const formatCurrency = (value) => {
        return `₱${value.toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const inputContainerStyle = {
        paddingHorizontal: 0,
    };

    const inputStyle = {
        fontSize: 16,
        color: '#0f172a',
        fontWeight: '500',
    };

    const inputBoxStyle = {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 14,
        backgroundColor: '#f8fafc',
        height: 52,
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-100">
            <ScrollView
                contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 40,
                }}
                showsVerticalScrollIndicator={false}
            >

                {/* Header */}
                <View className="mb-6 mt-4">
                    <Text className="text-3xl font-bold text-slate-900">
                        Electricity Bill
                    </Text>

                    <Text className="mt-1 text-base text-slate-500">
                        Estimate your household electricity bill
                    </Text>
                </View>

                {/* Main Calculator Card */}
                <Card
                    containerStyle={{
                        borderRadius: 20,
                        margin: 0,
                        padding: 20,
                        borderWidth: 0,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.08,
                        shadowRadius: 10,
                        elevation: 4,
                    }}
                >
                    <View className="mb-5">
                        <Text className="text-xl font-bold text-slate-900">
                            Meter Information
                        </Text>

                        <Text className="mt-1 text-sm text-slate-500">
                            Enter the details from your household bill.
                        </Text>
                    </View>

                    {/* Previous Reading */}
                    <Text className="mb-1 text-sm font-semibold text-slate-600">
                        Previous Reading
                    </Text>

                    <Input
                        containerStyle={inputContainerStyle}
                        inputContainerStyle={inputBoxStyle}
                        inputStyle={inputStyle}
                        keyboardType="decimal-pad"
                        placeholder="e.g. 1250"
                        placeholderTextColor="#94a3b8"
                        value={previousReading}
                        onChangeText={setPreviousReading}
                        rightIcon={
                            <Text className="text-sm font-medium text-slate-400">
                                kWh
                            </Text>
                        }
                    />

                    {/* Present Reading */}
                    <Text className="mb-1 text-sm font-semibold text-slate-600">
                        Present Reading
                    </Text>

                    <Input
                        containerStyle={inputContainerStyle}
                        inputContainerStyle={inputBoxStyle}
                        inputStyle={inputStyle}
                        keyboardType="decimal-pad"
                        placeholder="e.g. 1380"
                        placeholderTextColor="#94a3b8"
                        value={presentReading}
                        onChangeText={setPresentReading}
                        rightIcon={
                            <Text className="text-sm font-medium text-slate-400">
                                kWh
                            </Text>
                        }
                    />

                    {/* Household kWh */}
                    <Text className="mb-1 text-sm font-semibold text-slate-600">
                        Household Total kWh Used
                    </Text>

                    <Input
                        containerStyle={inputContainerStyle}
                        inputContainerStyle={inputBoxStyle}
                        inputStyle={inputStyle}
                        keyboardType="decimal-pad"
                        placeholder="e.g. 130"
                        placeholderTextColor="#94a3b8"
                        value={kilowattHourUsed}
                        onChangeText={setKilowattHourUsed}
                        rightIcon={
                            <Text className="text-sm font-medium text-slate-400">
                                kWh
                            </Text>
                        }
                    />

                    {/* Monthly Bill */}
                    <Text className="mb-1 text-sm font-semibold text-slate-600">
                        Household Total Monthly Bill
                    </Text>

                    <Input
                        containerStyle={inputContainerStyle}
                        inputContainerStyle={inputBoxStyle}
                        inputStyle={inputStyle}
                        keyboardType="decimal-pad"
                        placeholder="e.g. 2500.00"
                        placeholderTextColor="#94a3b8"
                        value={totalMonthlyBill}
                        onChangeText={setTotalMonthlyBill}
                        leftIcon={
                            <Text className="mr-1 text-base font-semibold text-slate-500">
                                ₱
                            </Text>
                        }
                    />

                    {/* Calculate Button */}
                    <Button
                        onPress={handlePress}
                        buttonStyle={{
                            borderRadius: 12,
                            paddingVertical: 15,
                        }}
                        containerStyle={{
                            marginTop: 8,
                        }}
                    >
                        <Text className="text-base font-bold text-white">
                            Calculate My Bill
                        </Text>
                    </Button>
                </Card>

                {/* Results */}
                {hasCalculated && (
                    <>
                        {/* Hero Result */}
                        <View
                            className="mt-5 rounded-2xl bg-slate-900 p-6"
                            style={{
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: 0.15,
                                shadowRadius: 10,
                                elevation: 5,
                                borderRadius: 20,
                                margin: 0,
                                marginTop: 16,
                                padding: 20,
                                borderWidth: 0,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.06,
                                shadowRadius: 8,
                                elevation: 3,
                            }}
                        >
                            <Text className="text-sm font-medium text-slate-400">
                                ESTIMATED ELECTRICITY BILL
                            </Text>

                            <Text className="mt-2 text-4xl font-bold text-white">
                                {formatCurrency(totalBilling)}
                            </Text>

                            <View className="mt-5 h-px bg-slate-700" />

                            <View className="mt-4 flex-row justify-between">
                                <View>
                                    <Text className="text-xs text-slate-400">
                                        Consumption
                                    </Text>

                                    <Text className="mt-1 text-base font-semibold text-white">
                                        {rateSum.toFixed(2)} kWh
                                    </Text>
                                </View>

                                <View className="items-end">
                                    <Text className="text-xs text-slate-400">
                                        Rate
                                    </Text>

                                    <Text className="mt-1 text-base font-semibold text-white">
                                        {formatCurrency(kiloWattPerHour)} / kWh
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Bill Breakdown */}
                        <Card
                            containerStyle={{
                                borderRadius: 20,
                                margin: 0,
                                marginTop: 16,
                                padding: 20,
                                borderWidth: 0,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.06,
                                shadowRadius: 8,
                                elevation: 3,
                            }}
                        >
                            <Text className="mb-5 text-xl font-bold text-slate-900">
                                Bill Breakdown
                            </Text>

                            {/* Previous */}
                            <View className="mb-4 flex-row items-center justify-between">
                                <View>
                                    <Text className="text-sm text-slate-500">
                                        Previous Reading
                                    </Text>

                                    <Text className="mt-1 text-base font-semibold text-slate-800">
                                        {parseFloat(previousReading).toFixed(2)} kWh
                                    </Text>
                                </View>

                                <Text className="text-slate-300">
                                    →
                                </Text>

                                <View className="items-end">
                                    <Text className="text-sm text-slate-500">
                                        Present Reading
                                    </Text>

                                    <Text className="mt-1 text-base font-semibold text-slate-800">
                                        {parseFloat(presentReading).toFixed(2)} kWh
                                    </Text>
                                </View>
                            </View>

                            {/* Consumption */}
                            <View className="mb-3 rounded-xl bg-slate-50 p-4">
                                <Text className="text-sm text-slate-500">
                                    My Electricity Used
                                </Text>

                                <Text className="mt-1 text-2xl font-bold text-slate-900">
                                    {rateSum.toFixed(2)}
                                    <Text className="text-sm font-medium text-slate-500">
                                        {' '}kWh
                                    </Text>
                                </Text>
                            </View>

                            {/* Rate */}
                            <View className="mb-3 rounded-xl bg-slate-50 p-4">
                                <Text className="text-sm text-slate-500">
                                    Electricity Rate
                                </Text>

                                <Text className="mt-1 text-2xl font-bold text-slate-900">
                                    {formatCurrency(kiloWattPerHour)}
                                    <Text className="text-sm font-medium text-slate-500">
                                        {' '} / kWh
                                    </Text>
                                </Text>
                            </View>

                            {/* Total */}
                            <View className="mb-3 rounded-xl bg-slate-50 p-4">
                                <Text className="text-sm text-slate-500">
                                    My Total Bill
                                </Text>

                                <Text className="mt-1 text-2xl font-bold text-slate-900">
                                    {formatCurrency(totalBilling)}
                                </Text>
                            </View>

                            {/* Remaining */}
                            <View className="rounded-xl bg-slate-50 p-4">
                                <Text className="text-sm text-slate-500">
                                    Remaining / Excess
                                </Text>

                                <Text className="mt-1 text-2xl font-bold text-slate-900">
                                    {formatCurrency(excessBilling)}
                                </Text>
                            </View>
                        </Card>

                        {/* Calculation Info */}
                        <View className="mt-5 px-2">
                            <Text className="text-center text-xs leading-5 text-slate-400">
                                Your estimated bill is calculated using your
                                household's effective electricity rate based
                                on the total monthly bill and total kWh used.
                            </Text>
                        </View>
                    </>
                )}

            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
