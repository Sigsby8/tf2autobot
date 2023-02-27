var message = "buy_Strange_Australium_Minigun";

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
}

message = message.replace("Non_Craftable", "Non-Craftable")
    .replace("non_craftable", "non-craftable")
    .replace("72", "'72")
    .replace("Nuts_n_Bolts", "Nuts n' Bolts")
    .replace("Kill_a_Watt","Kill-a-Watt")
    .replace("Terror_Watt", "Terror-Watt")
    .replace("Squash_n_Twist","Squash n' Twist")

if (message.startsWith('sell_')) {
    var message = '!' + titleCase(message.replace('sell_', 'sell ').replace(/_/g, ' '))
}

else if (message.startsWith('buy_')) {
    var message = '!' + titleCase(message.replace('buy_', 'buy ').replace(/_/g, ' '))
}   

console.log(message)
            