<?php

function validateRegulationNumber($regNum) {
    $pattern = '/^([A-Z])([A-Z])(\d{4})_(\d{1,2})_(\d{1,2})$/';
    if (!preg_match($pattern, $regNum, $matches)) {
        return false;
    }

    list(, $letter1, $letter2, $year, $num1, $num2) = $matches;

    if ($letter1 >= $letter2) {
        return false;
    }

    $currentYear = date("Y");
    if ((int)$year != $currentYear) {
        return false;
    }

    if ((int)$num1 + (int)$num2 != 100) {
        return false;
    }

    return true;
}

function luhnAlgorithm($cardNumber) {
    $total = 0;
    $reverseDigits = strrev($cardNumber);

    for ($i = 0; $i < strlen($reverseDigits); $i++) {
        $n = (int)$reverseDigits[$i];
        if ($i % 2 == 1) {
            $n *= 2;
            if ($n > 9) {
                $n -= 9;
            }
        }
        $total += $n;
    }

    return $total % 10 == 0;
}

function validatePaymentInfo($cardNumber, $expirationDate) {
    if (!luhnAlgorithm($cardNumber)) {
        return false;
    }

    $expDate = DateTime::createFromFormat('m/y', $expirationDate);
    if ($expDate === false) {
        return false;
    }

    $now = new DateTime();
    if ($expDate < $now) {
        return false;
    }

    return true;
}

$validRegulationNumber = "KW2024_22_78";
$invalidRegulationNumber = "ZA2024_22_78";

$validCardNumber = "4532015112830366";
$invalidCardNumber = "4532015112830365";
$validExpirationDate = "12/24";
$invalidExpirationDate = "11/22";

echo "Valid regulation number ($validRegulationNumber): " . (validateRegulationNumber($validRegulationNumber) ? 'True' : 'False') . "\n";
echo "Invalid regulation number ($invalidRegulationNumber): " . (validateRegulationNumber($invalidRegulationNumber) ? 'True' : 'False') . "\n";

echo "Valid card numbers ($validCardNumber, $validExpirationDate): " . (validatePaymentInfo($validCardNumber, $validExpirationDate) ? 'True' : 'False') . "\n";
echo "Valid expiration + Invalid card number ($invalidCardNumber, $validExpirationDate): " . (validatePaymentInfo($invalidCardNumber, $validExpirationDate) ? 'True' : 'False') . "\n";
echo "Invalid expiration + Valid card number ($validCardNumber, $invalidExpirationDate): " . (validatePaymentInfo($validCardNumber, $invalidExpirationDate) ? 'True' : 'False') . "\n";

?>
