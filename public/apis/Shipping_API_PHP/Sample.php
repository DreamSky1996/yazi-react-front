<?php
$params = [
    'ClientInfo' => [
        'AccountCountryCode' => 'JO',
        'AccountEntity' => 'AMM',
        'AccountNumber' => '00000',
        'AccountPin' => '000000',
        'UserName' => 'user@company.com',
        'Password' => '000000000',
        'Version' => 'v1.0'
    ],
    'Transaction' => [
        'Reference1' => '001'
    ],
    'OriginAddress' => [
        'City' => 'Amman',
        'CountryCode' => 'JO'
    ],
    'DestinationAddress' => [
        'City' => 'Dubai',
        'CountryCode' => 'AE'
    ],
    'ShipmentDetails' => [
        'PaymentType' => 'P',
        'ProductGroup' => 'EXP',
        'ProductType' => 'PPX',
        'ActualWeight' => ['Value' => 5, 'Unit' => 'KG'],
        'ChargeableWeight' => ['Value' => 5, 'Unit' => 'KG'],
        'NumberOfPieces' => 5
    ]
];

$soapClient = new SoapClient('http://url/to/wsdl.wsdl', ['trace' => 1]];
$results = $soapClient->CalculateRate($params];

echo '<pre>';
print_r($results];
die(];
?>
