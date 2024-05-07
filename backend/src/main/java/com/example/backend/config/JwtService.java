package com.example.backend.config;


import com.example.backend.Mitarbeiter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Service
public class JwtService {
    private static final String SECRET_KEY = "b94794d13eafb4a1ab45d8efa6c561c9897511e908e71bcbabcc56e3f5a9550142581f50c2288666e8dd859fa04f4f7bf188a1b7bd1f7ac09fd31db9db9141f6c0d3765d3f4c625f7d5eef86a5cde15627f48b3834fcc331e70e5192cb0275faa35ad7b08b082f6fafa3856ee0e2c458a28021390e71a2e92f1fd53d97b28b9e7f2c487ae7a33c90b0134e5a4f0a9a7506a2b468918960eba0b54e8b9c87dcd3264a16c851f032f28217de180d495cdb55f9fd9fc8a554bd0bc3a4118d8ca1d3a27329c9df718b595281f6ee89bf2b0f1c3df49da28370e59d3f8a70f4950947b3e3e4e465e8097a28738919cd1b0996b7ba0d9b0d3997248026faa84740fa24c13421e6080ddf8688158a5cf1faead4307cdb2f19e71ba19906d46a6dcc85334498ff5df41b70287c0f5877abb278b31a629f3bccb352958fde2504dc1e0cff2a09f99a8e8b16f3253466ff09961577c6556ea12151fba3ca096b27768060fe67b805ae373a497c27c94ec8db56ad3e8bf0d12664e2a339b8951247427a9167993b34dea0beb2984410a2d90175633db00013ff331018cd3db5032dd96f445d61e59e75c38afc75c553e8a932615d2beede37f6bccd52b3749c7c365a0df4c4fadbd9222d7f5fd56282dc1c72e916d2ab05c10d4dbeba4e0ed10ca10b516cb328538b14fa24ce1aee1c4e8e83a48e2ae24bbb1aa3f380acf0f469e9c66440779ef332b7e9ba1ed86dc3f28af9ec03c18c7abca6eb9b5cb3c7d9702248e086a364ff150fc95e7d376c946a553ed1f6419825c9d3a84e4f393c342c4f0909211896916944d5bcfe7040ce520ca65b48f308e124a8ae31c5cc3ffb33142a0cf9c27ed5441bdeac9c0dde71dea1a4851b65052120a891483be58201a6980f636b2b72be3b267f09f38ce3455fb1b02fd8dfa3e5a88aca7a44ba34d9caf468e53424c6c2c211d9f89353cd464ce7a9b39b22b82b7f0d2a42af87281807dedc13c1e08f0fa38fd4687673b3862940d3f95f39c6713b57959bb06498c8117c801e30bb0ec2fc5f4043e23917261daf69619e85f64de9bf0da3b9120be786b0edcc8e1224dc8242372fc8ed35c17e687fb4906f9599a2a6c0055a024343bdddcfadc96dfed203a777696696643ebff4b2359d4895803cf65a7444355fa55aba84c61c2dc79a7f17850fd11e9ad4e610d493c0c5660ecdac3d4f836a288051dba97ebb88528db092aaad2cfaaccd13b30c1ab44afe7b3d7a45655ca29865fb78de002cd4c9300aa5b402d0c20fad6412eeab82a4001e740fcfe5cae31d2a947552436407c2c0812c723392d9b97e366f181ba1d21f7e83170741b724a839c055fd61afcb522661ed64f3fc8a6a457d2a362fc7e33476975ecd82ad41577d3335c3ae3a575c1bb87373631da87e2227dcc6076194bab7b43007d7cab107b56c20651b2b02a0bb75bc9ffff62958855571a8f9c9e90927270aee96f049b6b1a40bedc1ce590bca3be24b6c7f53258efc67a9e08c23720e28ca822a6d2dabaf00ebd453b5ee26cdcf1e40d5d1177527ff0a030452927016d2c908fafa7c520b4c4b1cfb51d50544eeb1838a7b73283469874ce615066da796c86b1b675b5f6a43a59b4361cdf158e6eac4616ac8385604cbe56fcf6ff28557cad6350f3683103cb1a429582def3fdf81891e0b4489bed38b63429609e5931471e650138d32956105a2d195228f22e09c3adecba0916f4e68790c204026c7514b8a662749ca1b72283d26380748c7df29bcf90ed057d1ac51168eb0bb92317cd71e7347c679e58a2e6730d6e048c5d2230df7621394b6131e8a33d126460c069eff20db17e6ecf0eaaa8ba0967aac8a5aefb00ed3c61e466db2f6e610efc01d55631199c185b14b1dd90b6b1d4b7300860c518c7d85982650919a2fdc54de72126c0c3211aced1e563337181a2d10c20c37ae63f11038add726623f75835db234b9296261885cc1b407fb7fa9961c87c6f00bef25871a76014749ba12ef3fdaaf7a7e15d59f0fb7bf8e963899f7ade29f44cc55c8cde03eb9a6eb5b866062b36f3987433b66d481c0a166764fae376f6c50365871510e68c8cfabeba9e0667870d07f20547953ab62274cd98b8b91493c57c7be26e1690d93008b72fc6a725fa70039e37ea9dfaf6e4eec61732f1dca133c0651e69da0db9bb8c96d0ec9c03c26bac5554f4df10a39d8f838cbb32f468193a91b27b91efccc8e97008bb2823518f5a96753c386a83043105d1e37411c81cd5324e88655f6fc5a48a51c087bf790e826d07ae0af31be2d85e067cb504da9512ab95e38bfebc2499032aa8b60abb2ee7495908af8167a571a46047f32e712f9f287683d8aff39c8bfdd110d835a77212ae52e8b7e4af4d0e798631edd53b30a5e07d20eb76325f4a1a1018899a028c1b0d8ae5cdc1b259671f74156d97493b8f193d2ad64fbf14b829b3093ce4cfb9952e1177d61d3157a1fa9717e42593b24d2e2019fd534eb197ba382a80f68f376c0478ce4ce68331a6940d21c92b3161087ed2a6e6fced68c6c0bfcb0d9d56a058405a025626ff32e4e1ce324befe214694014f95dca5db3a806dbd9cce9cfbb8866a582f3d2774945ec3aacc42c4113eda671aa9242a5437fdfdce45427a0ae1b7d56af2a5f3308b59365cb207541a0c743260a8062c131f47f2a06ec561eba1207899c1f93e4fc4e849fd5beaec5cd8cb79402eae6b7657cb9dcba5adc6da64072fb219cbb13d24771bf0f8499efd3f6df6d6dc1d297b5ba46a4c8287224ff2875ca46fc0f1063d4718906be2034be04558eee41279053d5851b8b925d48c8b3cc32a99811082c3ff28f439984c0fd42ba82c9e5f882aec1321f93652d167c15c1a5114c21eaa072df926";
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    public String generateToken(Mitarbeiter userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }
    public String generateToken(
            Map<String, Object> extraClaims,
            Mitarbeiter userDetails
    ){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
