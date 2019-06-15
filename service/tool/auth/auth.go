package auth

import (
	"context"
	"fmt"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"google.golang.org/grpc/metadata"
)

const signingKey = "hongshengjiehenshuai"

// NewToken NewToken
func NewToken(userID string) (string, error) {
	claims := JWTClaims{
		userID,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24 * 30 * 12).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS512, claims)
	return token.SignedString([]byte(signingKey))
}

func validateToken(tokenString string) (string, error) {
	token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(*jwt.Token) (interface{}, error) {
		return []byte(signingKey), nil
	})
	if claims, ok := token.Claims.(*JWTClaims); ok && token.Valid {
		fmt.Printf("%v %v", claims.UserID, claims.StandardClaims.ExpiresAt)
		return claims.UserID, nil
	}
	return "", err

}

// JWTClaims JWTClaims
type JWTClaims struct {
	UserID string `json:"UserID"`
	jwt.StandardClaims
}

// GetUserIDFromContext GetUserIDFromContext
func GetUserIDFromContext(ctx context.Context) string {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return ""
	}
	token := md["token"]
	if len(token) <= 0 {
		return ""
	}
	userID, err := validateToken(token[0])
	if err != nil {
		return ""
	}
	return userID
}
