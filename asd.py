#Given Info
usedIV = "6e068d98d1edea65eff1dc798dc89211"
nextIV = "1f30cccdd1edea65eff1dc798dc89211"
plaintext = "Yes#############"

#Used to XOR the bytearrays
xor = lambda s1, s2: bytearray(a ^ b for a, b in zip(s1, s2))

#Get result
result = xor(bytearray(plaintext, encoding='utf-8'), bytearray.fromhex(usedIV))
result = xor(result,bytearray.fromhex(nextIV))
print(result.hex())